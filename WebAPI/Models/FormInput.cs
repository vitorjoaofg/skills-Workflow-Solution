namespace WebAPI.Models;

public class FormInput
{
    public string? Name { get; set; }
    public string? Type { get; set; }
    public string? Label { get; set; }
    public string? Value { get; set; }
    public List<string>? Options { get; set; }
    public Validator? Validators { get; set; }
    
    public List<FormInput> FormInputBuilder()
    {
        var form = new List<FormInput>
        {
            new()
            {
                Name = "firstName",
                Type = "text",
                Label = "First Name",
                Value = "",
                Options = new List<string>(),
                Validators = new Validator()
                {
                    Required = true,
                    MinLength = 3
                }
            },
            new()
            {
                Name = "languages",
                Type = "select",
                Label = "Language",
                Value = "Python",
                Options = new List<string>()
                {
                    "Python",
                    "C#",
                    "Angular",
                    "React"
                },
                Validators = new Validator()
                {
                    Required = true,
                    MinLength = 5
                }
            },
            new()
            {
                Name = "companies",
                Type = "list",
                Label = "Choose some companies",
                Value = "",
                Options = new List<string>()
                {
                    "Google",
                    "Amazon",
                    "PayPal"
                },
                Validators = new Validator()
                {
                    Required = false
                }
            }
        };

        return form;
    }
}