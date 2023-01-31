import React from 'react';

const Home = () => {
    return (
        <div className='flex justify-center lg:mb-14'>
            <div className='bg-slate-300 lg:w-3/5 lg:p-10 p-5 lg:mt-7 shadow-xl'>
                <p className='text-center font-bold'>Welcome to the Home. Hope you are doing well !</p>
                <div>
                    <p className='font-bold mt-7'>Admin Access:</p>
                    <p>Email : admin@gmail.com</p>
                    <p>Password: 123456As?</p>
                </div>
                <p className='font-bold mt-4'>Functionalities: </p>

                <ul className='p-5' style={{ listStyleType: "disc" }}>
                    <li >For visiting the website user must be registration first and able to see home.</li>
                    <li>Applying JSOW WEB TOKEN which prevents unauthorized data access from database.</li>
                    <li>Only verified admin can access Add Data & Dashboard routes. </li>
                    <li>This project is developed by using React JS framework and mongoDB as database.</li>
                    <li>Admin can insert a company total expanses for a day in Add Data routes by clicking Insert Data button which is in left side of the page.</li>
                    <li>We use react day picker for selecting day. User must ensure the correct date while inserting data.</li>
                    <li>
                        Data with same category and sub-category are not allowed to re-insert.
                    </li>
                    <li>
                        Admin can add new category in Add Data routes which is displayed when insert data
                    </li>
                    <li>Admin can add or delete data at any time</li>
                    <li>In dashboard routes, It displays all data from the starting of the company</li>
                    <li>
                        In Dashboard, It has 4 different button in left side with differnet functionalities  which provide to access data according to specific date,month,year and category.  It also displays the sum of total amount.
                    </li>
                    <li>Admin can download table data as excel file by clicking Export Excel Button</li>
                </ul>
                <p className='font-bold'>Used Technologies: </p>
                <p>
                    React.Js | React-router-dom | Firebase | Tailwind CSS | Node.Js |
                    Express.Js | MongoDB | jwt-authentication | daisyui | react-day-picker | other npm packages.
                </p>


            </div>

        </div >
    );
};

export default Home