using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace SXSoft.common
{
    public static class DataValidate
    {
        public static ModelState Validate(object obj)
        {
            var errdic = new Dictionary<string, List<string>>();
            var modelState = new ModelState()
            {
                IsValid = true
            };
            var validationContext = new ValidationContext(obj);
            var results = new List<ValidationResult>();
            if (!Validator.TryValidateObject(obj, validationContext, results, true))
            {
                var type = obj.GetType();
                modelState.IsValid = false;
                results.ForEach(item =>
                {
                    modelState.AddModelError(item.MemberNames.FirstOrDefault(), item.ErrorMessage);
                    var value = type.GetProperty(item.MemberNames.FirstOrDefault()).GetValue(obj);
                    if (value == null)
                    {
                        value = "";
                    }
                    modelState.keyValues.Add(item.MemberNames.FirstOrDefault(), value.ToString());
                });
            }
            return modelState;
        }
    }

    public class ModelState
    {
        public ModelState()
        {
            this.Values = new Dictionary<string, List<string>>();
            this.keyValues = new Dictionary<string, string>();
        }
        /// <summary>
        /// 是否验证通过
        /// </summary>
        public bool IsValid { get; set; }
        /// <summary>
        /// 错误消息列表
        /// </summary>
        public Dictionary<string, List<string>> Values { get; set; }
        /// <summary>
        /// 验证失败的键值对
        /// </summary>
        public Dictionary<string, string> keyValues { get; set; }
        /// <summary>
        /// 添加模型数据错误
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        public void AddModelError(string key, string value)
        {
            var count = Values.Where(a => a.Key == key).Count();
            if (count != 0)
            {
                var item = Values.Where(a => a.Key == key).FirstOrDefault();
                item.Value.Add(value);
                return;
            }
            var list = new List<string>();
            list.Add(value);
            Values.Add(key, list);
        }
    }
}