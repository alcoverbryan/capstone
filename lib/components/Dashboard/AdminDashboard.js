import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Calendar, MagnifyingGlass } from '../HeroIcons';
import AllMembersComponent from '../ShellMembers/AllMembersComponent';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function AdminDashboard({ allBranch, allRegister, userLogIn }) {
    const [timeframe, setTimeframe] = useState('daily');
    const [selectedBranch, setSelectedBranch] = useState("");
    const [selectedSection, setSelectedSection] = useState('Fuel Sales Reports');
    const [showAllMembers, setShowAllMembers] = useState(false); 
    const [employeeCount, setEmployeeCount] = useState(0);

    useEffect(() => {
        if (selectedBranch) {
            const branchEmployees = allRegister.filter(member => member.branch_id === selectedBranch);
            setEmployeeCount(branchEmployees.length);
        } else {
            setEmployeeCount(allRegister.length);
        }
    }, [selectedBranch, allRegister]);

    const handleBack = () => {
        if (showAllMembers) {
            setShowAllMembers(false); 
        }
    };

    const dataConfig = {
        daily: {
            labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
            datasets: [
                {
                    label: 'Revenue',
                    data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 20),
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Expenses',
                    data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 10),
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                }
            ]
        },
        weekly: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [
                {
                    label: 'Revenue',
                    data: [200, 300, 250, 400],
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Expenses',
                    data: [150, 250, 300, 350],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                }
            ]
        },
        monthly: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Revenue',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Expenses',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                }
            ]
        },
        yearly: {
            labels: ['2020', '2021', '2022', '2023'],
            datasets: [
                {
                    label: 'Revenue',
                    data: [800, 900, 750, 850],
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Expenses',
                    data: [600, 700, 650, 700],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                }
            ]
        }
    };

    const pieData = {
        daily: {
            labels: ['Gas A', 'Gas B', 'Gas C'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                },
            ],
        },
        weekly: {
            labels: ['Gas A', 'Gas B', 'Gas C'],
            datasets: [
                {
                    data: [250, 70, 150],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                },
            ],
        },
        monthly: {
            labels: ['Gas A', 'Gas B', 'Gas C'],
            datasets: [
                {
                    data: [400, 100, 200],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                },
            ],
        },
        yearly: {
            labels: ['Gas A', 'Gas B', 'Gas C'],
            datasets: [
                {
                    data: [500, 150, 300],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                },
            ],
        }
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Revenue vs Expenses (${timeframe.charAt(0).toUpperCase() + timeframe.slice(1)})`,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    };

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Fuel Sales Distribution',
            },
        },
    };

    const [searchInput, setSearchInput] = useState("");

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
    };

    const renderContent = () => {
        if (showAllMembers) {
            // Filter the employees based on the selected branch
            const filteredEmployees = selectedBranch 
                ? allRegister.filter(member => member.branch_id === selectedBranch) 
                : allRegister;

            return <AllMembersComponent handleBack={handleBack} allRegister={filteredEmployees} allBranch={allBranch} userLogIn={userLogIn} searchInput={searchInput} />;
        }

        if (selectedSection === 'Fuel Sales Reports') {
            return <div className="h-[600px] border-0 border-green-700 flex items-center justify-center w-full"><Bar data={dataConfig[timeframe]} options={barOptions} /> </div>;
        } else if (selectedSection === 'Fuel Trend Graph') {
            return <div className="h-[600px] border flex items-center justify-center w-full"><Pie data={pieData[timeframe]} options={pieOptions} /></div>;
        }
    };

    return (
        <div className="p-4 border-0 border-red-500">
            <div className="flex justify-end gap-4 border-0 items-center">
                {showAllMembers && (
                    <div className="relative  md:w-[300px] w-full mb-4 border-0 flex items-center justify-end space-x-2">
                        <input
                            type="text"
                            placeholder="Search Member..."
                            className="border-b p-2 w-full focus:outline-none h-10 pl-8 bg-light"
                            onChange={(e) => searchItems(e.target.value)}
                        />
                        <div className="absolute top-0 left-0 h-full flex items-center pr-2">
                            <MagnifyingGlass className="md:w-5 w-4 md:h-5 h-4" />
                        </div>
                    </div>
                )}
                {!showAllMembers && (
                    <div className="mb-4 border-0 flex items-center justify-end space-x-2">
                        <div className="flex items-center gap-2 border lg:px-4 lg:py-2 w-[200px] bg-white">
                            <Calendar className="h-5 w-5 text-red-600" />
                            <select
                                value={timeframe}
                                onChange={(e) => setTimeframe(e.target.value)}
                                className="flex items-center gap-2 border-0 lg:px-4 w-[200px] bg-white outline-none appearance-none"
                            >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                                <option value="yearly">Yearly</option>
                            </select>
                        </div>
                    </div>
                )}

                <div className="mb-4 border-0 flex items-center justify-end space-x-2">
                    <div className="flex items-center gap-2 border lg:px-4 lg:py-2 w-[200px] bg-white">
                        <Calendar className="h-5 w-5 text-red-600" />
                        <select
                            value={selectedBranch}
                            onChange={(e) => setSelectedBranch(e.target.value)}
                            className="flex items-center gap-2 border-0 lg:px-4 w-[200px] bg-white outline-none appearance-none"
                        >
                            <option value="">All Branches</option>
                            {allBranch.map((branch) => (
                                <option key={branch.id} value={branch.id}>
                                    {branch.branch_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>  
            
            <div className="flex items-center">
                {!showAllMembers && (
                    <div className="flex flex-col space-y-10 ">
                        <div
                            className="bg-gray-200 p-10 rounded-lg shadow-md border cursor-pointer"
                            onClick={() => {
                                setSelectedSection('Fuel Sales Reports');
                                setShowAllMembers(false); 
                            }}
                        >
                            <p>Fuel Sales Reports</p>
                        </div>
                        <div
                            className="bg-gray-200 p-10 rounded-lg shadow-md border cursor-pointer"
                            onClick={() => {
                                setShowAllMembers(true); 
                            }}
                        >
                            <p>Total number of employees</p>
                            <p className="text-lg font-semibold mt-2">{employeeCount}</p> {/* Display employee count */}
                        </div>
                        <div
                            className="bg-gray-200 p-10 rounded-lg shadow-md border cursor-pointer"
                            onClick={() => {
                                setSelectedSection('Fuel Trend Graph');
                                setShowAllMembers(false); 
                            }}
                        >
                            <p>Fuel Trend Graph</p>
                        </div>
                    </div>
                )}
                <div className="p-6 ml-6 flex-grow">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}
