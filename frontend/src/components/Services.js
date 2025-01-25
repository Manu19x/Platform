import React from 'react';

const Services = () => {
    const sampleServices = [
        { id: 1, title: "Logo Design", description: "Get professional logos designed." },
        { id: 2, title: "Web Development", description: "Build modern and responsive websites." },
        { id: 3, title: "Content Writing", description: "High-quality content for blogs and websites." }
    ];

    return (
        <div className="container mx-auto py-10">
            <h2 className="text-2xl font-bold text-center mb-6">Popular Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleServices.map(service => (
                    <div key={service.id} className="p-4 border rounded shadow">
                        <h3 className="text-xl font-semibold">{service.title}</h3>
                        <p className="mt-2 text-gray-700">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
