using Microsoft.AspNetCore.Mvc;
using WebAPI.Dtos;
using WebAPI.Models;
using WebAPI.Repositories;

namespace WebAPI.Controllers;

[ApiController]
[Route("[controller]s")]
public class DynamicFormController : ControllerBase
{
    private readonly IDynamicForm _dynamicForm;

    public DynamicFormController()
    {
        _dynamicForm = new InMemDynamicFormRepo();
    }

    [HttpGet]
    public ActionResult<IEnumerable<DynamicFormDto>> GetDynamicForms()
    {
        return _dynamicForm.GetDynamicForms().Select(x => new DynamicFormDto
        {
            DynamicFormId = x.DynamicFormId, 
            DynamicFormContent = x.DynamicFormContent
        }).ToList();
    }
    
    [HttpGet("{dynamicFormId:guid}")]
    public ActionResult<ControlsDto> GetDynamicForm(Guid dynamicFormId)
    {
        var dynamicForm = _dynamicForm.GetDynamicForm(dynamicFormId);
        if (dynamicForm == null)
            return NotFound();
        
        return new ControlsDto
        {
            Controls = dynamicForm.DynamicFormContent
        };

    }

    [HttpPost]
    public ActionResult CreateDynamicForm(CreateOrUpdateDynamicFrmDto dynamicForm)
    {
        var myDynamicForm = new DynamicForm
        {
            DynamicFormId = Guid.NewGuid(),
            DynamicFormContent = dynamicForm.DynamicFormContent
        };
        
        _dynamicForm.CreateDynamicForm(myDynamicForm);
        return Ok();
    }
    
    [HttpPut("{dynamicFormId:guid}")]
    public ActionResult UpdateDynamicForm(Guid dynamicFormId, CreateOrUpdateDynamicFrmDto dynamicForm)
    {
        var currentDynamicForm = _dynamicForm.GetDynamicForm(dynamicFormId);
        if (currentDynamicForm == null)
            return NotFound();
        
        currentDynamicForm.DynamicFormContent = dynamicForm.DynamicFormContent;

        _dynamicForm.UpdateDynamicForm(dynamicFormId, currentDynamicForm);
        return Ok();
    }

    [HttpDelete("{dynamicFormId:guid}")]
    public ActionResult DeleteDynamicForm(Guid dynamicFormId)
    {
        var dynamicForm = _dynamicForm.GetDynamicForm(dynamicFormId);
        if (dynamicForm == null)
            return NotFound();
        
        _dynamicForm.DeleteDynamicForm(dynamicFormId);
        return Ok();
    }
    
}