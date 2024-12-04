using Microsoft.EntityFrameworkCore;
using UserRegistrationAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Thêm DbContext vào dịch vụ
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("UserDatabase")));

// Thêm CORS vào dịch vụ
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
        policy.AllowAnyOrigin()   // Cho phép mọi nguồn truy cập
              .AllowAnyMethod()   // Cho phép tất cả các phương thức HTTP
              .AllowAnyHeader();  // Cho phép tất cả các tiêu đề HTTP
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Sử dụng CORS với chính sách "AllowAllOrigins"
app.UseCors("AllowAllOrigins");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
