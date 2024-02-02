﻿using System.ComponentModel.DataAnnotations;

namespace ido.Server.Models
{
    public class Account
    {
        [Key]

        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
