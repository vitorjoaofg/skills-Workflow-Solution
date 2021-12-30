using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json.Linq;

namespace WebAPI.Models;

public class DynamicForm
{
    [Key]
    public Guid DynamicFormId { get; set; }
    public List<FormInput>? DynamicFormContent { get; set; }
}