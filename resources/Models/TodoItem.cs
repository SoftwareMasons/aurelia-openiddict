﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace resources.Models
{
    public class TodoItem
    {
        public string Key { get; set; }
        public string Name { get; set; }
        public bool IsComplete { get; set; }
    }
}