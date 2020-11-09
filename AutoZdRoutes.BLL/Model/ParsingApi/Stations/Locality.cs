using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace AutoZdRoutes.BLL.Model.ParsingApi.Stations
{
    public enum LocalityType { 
        World = 0,
        Countrie = 1,
        Region = 2,
        Settlement = 3,
        Station = 4
    }
    /// <summary>
    /// 
    /// </summary>
    public class Locality
    {
        //JsonSerializer.Deserialize<Countries> вызывает базовый конструтор
        public Locality() {
            this.id=temp_id++;
        }
        static int temp_id;  // сбрасывается в методе SynchronizeSheduling.ReadJson(), что конечно же плохо, но пока на скорую руку сделал это стат.поле
        /// <summary>
        /// Требуется вызвать при новой заливке данных с yandex-api
        /// </summary>
        public static void SetId0() {
            temp_id = 0;
        }
        public int id;
        public int parent_id; //поля id и parent_id будут записаны в БД
        public Codes codes { get; set; }
        public string title { get; set; }
        public virtual LocalityType type => LocalityType.World;
        public virtual Locality[] Childs => null;
    }
}
