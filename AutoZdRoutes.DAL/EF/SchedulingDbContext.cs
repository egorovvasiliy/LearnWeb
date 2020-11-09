using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Console;
using AutoZdRoutes.DAL.Entities;
using AutoZdRoutes.DAL.Model;

namespace AutoZdRoutes.DAL
{
    public partial class SchedulingDbContext : DbContext
    {
        public SchedulingDbContext()
        {
        }

        public SchedulingDbContext(DbContextOptions<SchedulingDbContext> options)
            : base(options)
        {
        }
        public static readonly ILoggerFactory MyLoggerFactory = LoggerFactory.Create(builder =>
        {
            builder.AddConsole();
            // или так с более детальной настройкой
            //builder.AddFilter((category, level) => category == DbLoggerCategory.Database.Command.Name
            //            && level == LogLevel.Information)
            //       .AddConsole();
        });
        public virtual DbSet<PointsInfo> PointsInfo { get; set; }
        public virtual DbSet<StationsType> StationsType { get; set; }
        public virtual DbSet<Points> Points { get; set; }
        //-----------Пользовательские компоненты бд--------------
        public virtual DbSet<ObjPoints> ObjPoints { get; set; } // см.FunctionRepositories.cs
        //----------------------------------------------------
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=VASYA\\SQLEXPRESS;Database=scheduling;Trusted_Connection=True;");
                //optionsBuilder.UseLoggerFactory(MyLoggerFactory);
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PointsInfo>(entity =>
            {
                entity.ToTable("obj_info");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Title)
                    .HasColumnName("title")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.TypeId).HasColumnName("type_id");

                entity.Property(e => e.YandexCode)
                    .HasColumnName("yandex_code")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Type)
                    .WithMany(p => p.PointsInfo)
                    .HasForeignKey(d => d.TypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_obj_type_type_id");
            });
            modelBuilder.Entity<StationsType>(entity =>
            {
                entity.HasKey(e => e.TypeId);

                entity.ToTable("stations_type");

                entity.Property(e => e.TypeId).HasColumnName("type_id");

                entity.Property(e => e.TypeName)
                    .IsRequired()
                    .HasColumnName("type_name")
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e=>e.Description)
                    .IsRequired()
                    .HasColumnName("description")
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });
            modelBuilder.Entity<Points>(entity =>
            {
                entity.ToTable("points");
                entity.HasKey(item => item.Id);
                entity.Property(e => e.Direction)
                    .HasColumnName("direction")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Latitude)
                    .HasColumnName("latitude")
                    .HasColumnType("decimal(18, 14)");

                entity.Property(e => e.Longitude)
                    .HasColumnName("longitude")
                    .HasColumnType("decimal(18, 14)");

                entity.Property(e => e.StationType)
                    .HasColumnName("station_type")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.TransportType)
                    .HasColumnName("transport_type")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                //entity.HasOne(d => d.IdNavigation)
                //    .WithOne(p => p.Stations)
                //    .HasForeignKey<Stations>(d => d.Loc_Id)
                //    .OnDelete(DeleteBehavior.ClientSetNull);
                //    .HasConstraintName("FK_stations_id");
            });
        }
    }
}
