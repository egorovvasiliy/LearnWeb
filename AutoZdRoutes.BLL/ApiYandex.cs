using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Reflection;
using System.Text;
using System.Text.Json;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using AutoZdRoutes.DAL;
using AutoZdRoutes.DAL.Entities;
using System.Threading.Tasks;
using AutoZdRoutes.BLL.Model.ParsingApi.Stations;
using AutoZdRoutes.BLL.ConvertersJSON;

namespace AutoZdRoutes.BLL
{
    public class ApiYandex
    {
        //-------------generic ReadAsString выдавал ошибку, поэтому 2 разных метода--------------------------------------------
        public static async Task<string> DownloadJsonString(string controller, string queryString)
        {
            string result;
            try
            {
                var client = StaticFields.httpClient;
                var url = string.Format($"{StaticFields.urlYandex}/{controller}/?apikey={StaticFields.apiKey}&{queryString}");
                var response = await client.GetAsync(url);
                return result = await response.Content.ReadAsStringAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public static async Task<Stream> DownloadJsonStream (string controller, string queryString)
        {
            Stream result;
            try
            {
                var client = StaticFields.httpClient;
                var url = string.Format($"{StaticFields.urlYandex}/{controller}/?apikey={StaticFields.apiKey}&{queryString}");
                var response = await client.GetAsync(url);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    return result = await response.Content.ReadAsStreamAsync();
                }
                else {
                    throw new Exception($"статус код y-api={response.StatusCode}");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //----------------------------------------------------------------------------------------------------
        public static async Task WriteJsonToFile(string jsonString,string path)
        {
            try
            {
                using (StreamWriter sw = new StreamWriter(path, false, System.Text.Encoding.Default))
                {
                    await sw.WriteAsync(jsonString);
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
        //----------------------------------------------------------------------------------------------------
        public static async Task<Locality> ReadJson(string jsonPath)
        {
            Locality resultData = null;
            try
            {
                using (FileStream fs = File.OpenRead(jsonPath))
                {
                    var jsOpt = new JsonSerializerOptions();
                    jsOpt.Converters.Add(new StringToDouble());
                    Locality.SetId0();
                    resultData = await JsonSerializer.DeserializeAsync<Countries>(fs, jsOpt);
                }
                return resultData;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //----------------------------------------------------------------------------------------------------
        public static async Task DownloadPointsToDBFromFile() {
            var st = await ReadJson(StaticFields.jsonPath);
            await Task.Run(() => WriteLocalityToDB(st));
        }
        public static void WriteLocalityToDB(Locality parent_node) {
            using (var dbContext = new SchedulingDbContext()) {
                dbContext.Database.SetCommandTimeout(1800);
                using (var transaction = dbContext.Database.BeginTransaction(System.Data.IsolationLevel.ReadCommitted)) {
                    try
                    {
                        //При использовании одной общей транзакии возникает блокировка lck_m_sch_s,т.к.процесс изменяет структуру таблицы
                        recWriteLocalityToDB(parent_node, dbContext);
                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                    }
                }
            }
        }
        public static void recWriteLocalityToDB(Locality parent_node, SchedulingDbContext dbContext, int stepRec = 0)
        {
            stepRec++;
            var nodes = parent_node.Childs;
            if(stepRec==1)
            {
                dbContext.Database.ExecuteSqlRaw("EXEC [dbo].[fill_again_sheduling_data] {0}", 0);
                dbContext.Database.ExecuteSqlRaw("EXEC [dbo].[check_stations] {0}", 0);
            }
            foreach (var node in nodes)
            {
                dbContext.PointsInfo.Add(new PointsInfo
                {
                    Temp_Id = node.id,
                    Temp_Parent_Id = parent_node.id,
                    YandexCode = node.codes.yandex_code,
                    Title = string.IsNullOrEmpty(node.title) ? null : node.title,
                    TypeId = (int)node.type
                });
                if (node.type == LocalityType.Station) // Выход из рекурсии
                {
                    dbContext.Points.Add(new Points
                    {
                        Id=node.id,
                        Direction = ((Station)node).direction,
                        StationType = ((Station)node).station_type,
                        TransportType = ((Station)node).transport_type,
                        Latitude = ((Station)node).latitude,
                        Longitude = ((Station)node).longitude,
                        Esr_code= ((Station)node).codes.esr_code
                    }); ;
                }
                if (node.Childs != null)
                    recWriteLocalityToDB(node, dbContext, stepRec);
            }
            if (stepRec == 1) {
                dbContext.SaveChanges();
                dbContext.Database.ExecuteSqlRaw("EXEC [dbo].[update_id_from_temp] {0}", 1);
                dbContext.Database.ExecuteSqlRaw("EXEC [dbo].[check_stations] {0}", 1);
            }
        }
        //----------------------------------------------------------------------------------------------------
    }
}