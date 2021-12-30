using WebAPI.Models;

namespace WebAPI.Repositories;

public interface IDynamicForm
{
    public IEnumerable<DynamicForm> GetDynamicForms();
    public DynamicForm? GetDynamicForm(Guid dynamicFormId);
    public void CreateDynamicForm(DynamicForm dynamicForm);
    public void UpdateDynamicForm(Guid dynamicFormId, DynamicForm dynamicForm);
    public void DeleteDynamicForm(Guid dynamicFormId);
}