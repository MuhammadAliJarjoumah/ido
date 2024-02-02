using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ido.Server.Models
{
    public enum Importance
    {
        None = 0,
        Low = 1,
        Medium = 2,
        High = 3
    }

    public enum Status
    {
        TODO = 0,
        DOING = 1,
        DONE = 2
    }
    public class Task
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public string DueDate { get; set; }

        public int EstimateId { get; set; } // Foreign key

        [ForeignKey("EstimateId")]
        public virtual Estimate Estimate { get; set; }

        public Importance Importance { get; set; }
        public Status Status { get; set; }
    }

    public class Estimate
    {
        [Key]
        public int Id { get; set; }
        public int Number { get; set; }
        public string Unit { get; set; }
    }


}
