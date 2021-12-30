using System.ComponentModel.DataAnnotations;
using WebAPI.Models;

namespace WebAPI.Dtos;

public record DynamicFormDto
{
    [Key]
    public Guid DynamicFormId { get; set; }
    public List<FormInput>? DynamicFormContent { get; set; }
};