type Usern = {
    firstName: string,
    lastName: string,
    age: number
}

// Types can help in union, intersection

interface Usern2 {
    firstName: string,
    lastName: string,
    age: number
}

// Union (type either this or that)
type greetArg = string | number;
function greet(id: string | number): void {
    console.log(id);    
}

greet(1);
greet("1");

// Intersection: Every property of different types

type Employeex = {
    name: string,
    department: string
}

type Manager = {
    name: string,
    experience: number
}

type teamLead = Employeex & Manager;

const teamLead1: teamLead = {
    name: 'Harsh',
    experience: 3,
    department: 'Data Science'
};

console.log(teamLead1.name, teamLead1.department);
