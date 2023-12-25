import React from 'react';

const Users = () => {
    return (
        <div>
            <h1 className='text-xl text-center mt-4 font-semibold'>The People Who Are <br /> benefitting from this website</h1>


            <div className='flex  flex-col lg:flex-row w-1/2 lg:w-[80%] mx-auto gap-5'>

            <div className="card w-96 bg-base-100 shadow-xl image-full">
  <figure><img src="https://bairesdev.mo.cloudinary.net/blog/2023/09/How-Many-Web-Developers-in-the-World-1.jpg?tx=w_828,q_auto" alt="Shoes" /></figure>
  <div className="card-body">
    
    <div className="card-actions justify-end">
    <h2 className="card-title mt-20">Developers</h2>
    </div>
  </div>
</div>

            <div className="card w-96 bg-base-100 shadow-xl image-full">
  <figure><img src="https://cdn.corporatefinanceinstitute.com/assets/professional-corporation.jpeg" alt="Shoes" /></figure>
  <div className="card-body">
    
    <div className="card-actions justify-end">
    <h2 className="card-title mt-20">Corporate Officials</h2>
    </div>
  </div>
</div>

            <div className="card w-96 bg-base-100 shadow-xl image-full">
  <figure><img src="https://assets-global.website-files.com/63361b004a9a6ca2e185c02c/64381de771e5a35d25841ebc_independent_investment_banker%20(1).jpg" alt="Shoes" /></figure>
  <div className="card-body">
    
    <div className="card-actions justify-end">
    <h2 className="card-title mt-20">Bankers</h2>
    </div>
  </div>
</div>
           
                
            </div>
        </div>
    );
};

export default Users;