import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserCard from "@/components/UserCard";
import { Search, Filter } from "lucide-react";

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  // Mock data for students
  const allStudents = [
    {
      id: 1,
      name: "Alice Johnson",
      university: "MIT",
      department: "Computer Science",
      avatar: ""
    },
    {
      id: 2,
      name: "Bob Chen",
      university: "Stanford University",
      department: "Engineering",
      avatar: ""
    },
    {
      id: 3,
      name: "Carol Davis",
      university: "Harvard University",
      department: "Business Administration",
      avatar: ""
    },
    {
      id: 4,
      name: "David Wilson",
      university: "MIT",
      department: "Mathematics",
      avatar: ""
    },
    {
      id: 5,
      name: "Eva Martinez",
      university: "Stanford University",
      department: "Psychology",
      avatar: ""
    },
    {
      id: 6,
      name: "Frank Lee",
      university: "Harvard University",
      department: "Biology",
      avatar: ""
    },
    {
      id: 7,
      name: "Grace Kim",
      university: "MIT",
      department: "Computer Science", 
      avatar: ""
    },
    {
      id: 8,
      name: "Henry Brown",
      university: "Yale University",
      department: "English Literature",
      avatar: ""
    },
    {
      id: 9,
      name: "Iris Thompson",
      university: "Princeton University",
      department: "Physics",
      avatar: ""
    },
    {
      id: 10,
      name: "Jack Anderson",
      university: "MIT",
      department: "Engineering",
      avatar: ""
    },
    {
      id: 11,
      name: "Kate Rodriguez",
      university: "Stanford University",
      department: "Computer Science",
      avatar: ""
    },
    {
      id: 12,
      name: "Lucas White",
      university: "Harvard University",
      department: "Psychology",
      avatar: ""
    }
  ];

  const universities = [
    "MIT",
    "Stanford University",
    "Harvard University", 
    "Yale University",
    "Princeton University"
  ];

  const departments = [
    "Computer Science",
    "Engineering",
    "Business Administration",
    "Psychology",
    "Biology",
    "Mathematics",
    "English Literature",
    "Physics"
  ];

  // Filter students based on search criteria
  const filteredStudents = allStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUniversity = !selectedUniversity || student.university === selectedUniversity;
    const matchesDepartment = !selectedDepartment || student.department === selectedDepartment;
    
    return matchesSearch && matchesUniversity && matchesDepartment;
  });

  const handleConnect = (id: number) => {
    console.log("Connecting to student:", id);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedUniversity("");
    setSelectedDepartment("");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Discover Students</h1>
        <p className="text-muted-foreground">Connect with students across your campus community</p>
      </div>

      {/* Filter Bar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 auth-input"
              />
            </div>

            {/* University Filter */}
            <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
              <SelectTrigger className="auth-input">
                <SelectValue placeholder="All Universities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Universities</SelectItem>
                {universities.map((university) => (
                  <SelectItem key={university} value={university}>
                    {university}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Department Filter */}
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="auth-input">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Departments</SelectItem>
                {departments.map((department) => (
                  <SelectItem key={department} value={department}>
                    {department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Clear Filters Button */}
            <button
              onClick={clearFilters}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
            >
              Clear Filters
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          {filteredStudents.length} students found
        </h2>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredStudents.map((student) => (
          <UserCard
            key={student.id}
            name={student.name}
            university={student.university}
            department={student.department}
            avatar={student.avatar}
            showConnectButton={true}
            onConnect={() => handleConnect(student.id)}
          />
        ))}
      </div>

      {/* No Results */}
      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No students found</p>
            <p className="text-sm">Try adjusting your search criteria</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discover;