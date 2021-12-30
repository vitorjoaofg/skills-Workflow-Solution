using WebAPI.Models;

namespace WebAPI.Dtos;

public class CreateOrUpdateDynamicFrmDto
{
    public List<FormInput>? DynamicFormContent { get; set; }
}