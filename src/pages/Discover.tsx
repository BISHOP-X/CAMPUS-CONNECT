import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import UserCard from "@/components/UserCard";
import { Search, Filter, Users, MapPin, GraduationCap, X } from "lucide-react";

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

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
    const matchesUniversity = !selectedUniversity || selectedUniversity === "all" || student.university === selectedUniversity;
    const matchesDepartment = !selectedDepartment || selectedDepartment === "all" || student.department === selectedDepartment;
    
    return matchesSearch && matchesUniversity && matchesDepartment;
  });

  const handleConnect = (id: number) => {
    console.log("Connecting to student:", id);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedUniversity("all");
    setSelectedDepartment("all");
  };

  return (
    <div className="space-y-6">
      {/* Premium Page Header */}
      <Card className="relative overflow-hidden border-0 shadow-xl bg-white">
        {/* Background Gradient */}
        <div className="h-40 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.15),transparent_60%)]"></div>
        </div>
        
        {/* Header Content */}
        <div className="relative -mt-20 px-8 pb-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* Icon and Title Section */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-3xl shadow-2xl flex items-center justify-center ring-4 ring-white/20">
                <Users className="w-10 h-10 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Discover Students</h1>
                <p className="text-lg text-gray-600">Connect with students across your campus community</p>
              </div>
            </div>
            
            {/* Stats Section */}
            <div className="flex items-center gap-8 lg:ml-auto">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{allStudents.length}</div>
                  <div className="text-sm text-gray-600">students</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{universities.length}</div>
                  <div className="text-sm text-gray-600">universities</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{departments.length}</div>
                  <div className="text-sm text-gray-600">departments</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Premium Filter Section */}
      <Card className="border-0 shadow-xl bg-white">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                <Filter className="h-5 w-5 text-indigo-600" />
              </div>
              <span className="text-xl font-semibold text-gray-900">Search & Filter</span>
            </div>
            {(searchTerm || selectedUniversity !== "all" || selectedDepartment !== "all") && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              >
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search by name, university, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 text-base border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
            />
          </div>

          {/* Filter Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* University Filter */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700">University</label>
              <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
                <SelectTrigger className="h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl">
                  <SelectValue placeholder="All Universities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Universities</SelectItem>
                  {universities.map((university) => (
                    <SelectItem key={university} value={university}>
                      {university}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Department Filter */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700">Department</label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((department) => (
                    <SelectItem key={department} value={department}>
                      {department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedUniversity !== "all" || selectedDepartment !== "all") && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-500">Active filters:</span>
              {searchTerm && (
                <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                  Search: "{searchTerm}"
                  <button 
                    onClick={() => setSearchTerm("")}
                    className="ml-1 hover:text-indigo-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {selectedUniversity !== "all" && (
                <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200">
                  {selectedUniversity}
                  <button 
                    onClick={() => setSelectedUniversity("all")}
                    className="ml-1 hover:text-purple-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {selectedDepartment !== "all" && (
                <Badge variant="secondary" className="bg-pink-50 text-pink-700 border-pink-200">
                  {selectedDepartment}
                  <button 
                    onClick={() => setSelectedDepartment("all")}
                    className="ml-1 hover:text-pink-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Header */}
      <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
            <Users className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredStudents.length} {filteredStudents.length === 1 ? 'student' : 'students'} found
            </h2>
            <p className="text-gray-600">Browse and connect with students</p>
          </div>
        </div>
        {filteredStudents.length > 0 && (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-4 py-2 text-sm font-medium">
            {Math.round((filteredStudents.length / allStudents.length) * 100)}% of all students
          </Badge>
        )}
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
        <Card className="border-0 shadow-xl bg-white">
          <CardContent className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Search className="h-16 w-16 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No students found</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              We couldn't find any students matching your search criteria. Try adjusting your filters or search terms.
            </p>
            <Button 
              onClick={clearFilters} 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl text-base font-medium"
            >
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Discover;