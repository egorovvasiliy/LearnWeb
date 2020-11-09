using System;
using System.Buffers;
using System.Buffers.Text;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace AutoZdRoutes.BLL.ConvertersJSON
{
    /// <summary>
    /// Этот конвертор понадобился для преобразования строк к числовым значениям.
    /// Решение проблемы наличия пустых строк "" в поле "latitude" JSON-объекта yandexApi
    /// </summary>
    public class StringToDouble : JsonConverter<double>
    {
        public override double Read(ref Utf8JsonReader reader, Type type, JsonSerializerOptions options)
        {
            if (reader.TokenType == JsonTokenType.String)
            {
                ReadOnlySpan<byte> span = reader.HasValueSequence ? reader.ValueSequence.ToArray() : reader.ValueSpan;
                if (Utf8Parser.TryParse(span, out double number, out int bytesConsumed) && span.Length == bytesConsumed)
                    return number;

                if (Double.TryParse(reader.GetString(), out number))
                    return number;
                else return 0; // если не удалось конвертировать верни 0
            }
            return reader.GetDouble();
        }

        public override void Write(Utf8JsonWriter writer, double value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString());
        }
    }
}
