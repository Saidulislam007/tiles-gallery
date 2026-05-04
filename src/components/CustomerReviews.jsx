import React from "react";

const reviews = [
    {
        name: "Jane Smith",
        location: "Chittagong",
        review:
            "I was amazed by the variety and quality of tiles at Tiles Corner. Their team helped me choose the perfect design for my home renovation project.",
    },
    {
        name: "John Doe",
        location: "Dhaka City",
        review:
            "Tiles Corner provided exceptional service and a stunning selection of tiles. Highly recommend for anyone looking to enhance their space with quality ceramics.",
    },
];

const CustomerReviews = () => {
    return (
        <section className="bg-white py-16 px-4 md:px-10 lg:px-20">
            {/* Heading */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                    Customer Reviews
                </h2>
                <p className="text-gray-500 mt-4 text-sm md:text-base">
                    See what our satisfied customers say about our tiles and ceramics.
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((item, index) => (
                    <div
                        key={index}
                        className="bg-[#F6EAD6] rounded-xl p-6 md:p-8 shadow-sm flex flex-col justify-between"
                    >
                        {/* Stars */}
                        <div className="text-black text-lg mb-4">★★★★★</div>

                        {/* Review Text */}
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
                            {item.review}
                        </p>

                        {/* User Info */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                                <img
                                    src="https://i.pravatar.cc/100"
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-900 text-sm md:text-base">
                                    {item.name}
                                </h4>
                                <p className="text-gray-500 text-xs md:text-sm">
                                    {item.location}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CustomerReviews;