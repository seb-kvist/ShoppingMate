using System;

namespace ShoppingMate.DTO.Auth;

public class LoginDto
{
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
}
