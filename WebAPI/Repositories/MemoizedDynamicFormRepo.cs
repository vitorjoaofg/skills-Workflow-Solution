using WebAPI.Models;

namespace WebAPI.Repositories;

public class InMemDynamicFormRepo:IDynamicForm
{
    private readonly List<DynamicForm> _dynamicForms;
    public InMemDynamicFormRepo()
    {
        var form = new FormInput().FormInputBuilder();

        _dynamicForms = new List<DynamicForm>
        {
            new() {DynamicFormId = new Guid("3fa85f64-5717-4562-b3fc-2c963f66afa6"), 
                DynamicFormContent = form}
        };
    }
    
    public IEnumerable<DynamicForm> GetDynamicForms()
    {
        return _dynamicForms;
    }

    public DynamicForm? GetDynamicForm(Guid dynamicFormId)
    {
        var dynamicForm = _dynamicForms.SingleOrDefault(x => x.DynamicFormId == dynamicFormId);
        return dynamicForm;
    }

    public void CreateDynamicForm(DynamicForm dynamicForm)
    {
        _dynamicForms.Add(dynamicForm);
    }

    public void UpdateDynamicForm(Guid dynamicFormId, DynamicForm dynamicForm)
    {
        throw new NotImplementedException();
    }

    public void DeleteDynamicForm(Guid dynamicFormId)
    {
        throw new NotImplementedException();
    }
}