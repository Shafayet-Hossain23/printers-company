// import { useQuery } from '@tanstack/react-query';
// import { format } from 'date-fns';
// import React from 'react';
// import { useState } from 'react';
// import { DayPicker } from 'react-day-picker';
// import 'react-day-picker/dist/style.css';
// import { useForm } from 'react-hook-form';
// import { toast, Toaster } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
// import Loading from '../Components/Loading';
// import './Add.css';


// const Add = () => {
//     const [selectedDate, setSelectedDate] = useState(new Date())
//     const date = format(selectedDate, 'PP');
//     const month = format(selectedDate, 'MMMM')
//     const year = format(selectedDate, 'yyyy')
//     const dateWithTime = format(selectedDate, 'PPpp')
//     const dateSlash = format(selectedDate, 'P')
//     const dateNumber = parseInt(format(selectedDate, "d"))
//     const monthNumber = parseInt(format(selectedDate, "M"))
//     const yearNumber = parseInt(year)



//     const { register, handleSubmit, watch, formState: { errors } } = useForm();
//     const [showModal, setShowModal] = useState(true)
//     const [showEditModal, setShowEditModal] = useState(true)
//     const [showNewCateModal, setShowNewCateModal] = useState(true)
//     const [editCateInfo, setEditCateInfo] = useState({})

//     // get categories info by specific date from user
//     const { data: categoriesInfo = [], isLoading: categoriesIsLoading, refetch: categoriesRefetch } = useQuery({
//         queryKey: ["categoriesByDate", date],
//         queryFn: async () => {
//             const res = await fetch(`https://printers-server.vercel.app/categoriesByDate?date=${date}`, {
//                 headers: {
//                     authorization: `bearer ${localStorage.getItem('accessToken')}`
//                 }
//             })
//             const data = res.json()
//             return data
//         }
//     })
//     // console.log(categoriesInfo)

//     // get categories name form the database
//     const { data: categoriesCollection = [], isLoading, refetch } = useQuery({
//         queryKey: ["allCategories"],
//         queryFn: async () => {
//             const res = await fetch('https://printers-server.vercel.app/allCategories', {

//                 headers: {
//                     authorization: `bearer ${localStorage.getItem("accessToken")}`
//                 }
//             })
//             const data = await res.json()
//             return data[0].categories
//         }
//     })

//     // const sortAllCategories = categoriesCollection[0].categories
//     const allCategories = categoriesCollection.sort()
//     // console.log(categoriesCollection[0]._id)

//     if (isLoading) {
//         return <Loading></Loading>
//     }
//     // if (categoriesIsLoading) {
//     //     return <Loading></Loading>
//     // }

//     // send input data to the database
//     const inputFormHandler = (event) => {
//         event.preventDefault()
//         const form = event.target
//         const categoryName = form.categoryName.value
//         const subCategoryNameUserCase = form.subCategoryName.value
//         const subCategoryName = subCategoryNameUserCase.toLowerCase()
//         const amountStr = parseFloat(form.amount.value).toFixed(2)
//         const amount = parseFloat(amountStr)


//         const categoryInfo = {
//             date,
//             month,
//             year,
//             dateWithTime,
//             // dateSlash,
//             dateNumber,
//             monthNumber,
//             yearNumber,
//             categoryName,
//             subCategoryName,
//             amount,


//         }
//         // console.log(categoryInfo)
//         fetch(`https://printers-server.vercel.app/categoriesInfo`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 authorization: `bearer ${localStorage.getItem("accessToken")}`
//             },
//             body: JSON.stringify(categoryInfo)
//         })
//             .then(res => res.json())
//             .then(data => {
//                 if (data.acknowledged) {
//                     setShowModal(false)
//                     categoriesRefetch()
//                     // console.log(data)
//                 }
//                 if (!data.acknowledged) {
//                     const message = window.alert("OOPS! You have already insert the same sub-category.")
//                     return message;
//                 }
//             })

//     }

//     // category delete
//     const categoryDeleteHandler = (cateInfo) => {
//         const confirm = window.confirm(`Are you sure you want to delete ${cateInfo.categoryName} category and ${cateInfo.subCategoryName} sub-category `)
//         if (confirm) {
//             fetch(`https://printers-server.vercel.app/deleteCategory?id=${cateInfo._id}`, {
//                 method: "DELETE",
//                 headers: {
//                     authorization: `bearer ${localStorage.getItem("accessToken")}`
//                 },
//             })
//                 .then(res => res.json())
//                 .then(data => {
//                     if (data.deletedCount) {
//                         categoriesRefetch()
//                         toast.success('Successfully deleted!')

//                     }

//                 })
//         }

//     }

//     // Edit

//     const editHandler = (cateInfo) => {
//         setEditCateInfo(cateInfo)
//         setShowEditModal(true)
//     }
//     // console.log(editCateInfo.categoryName)
//     const editFormHandler = (event) => {
//         event.preventDefault()
//         const form = event.target
//         const categoryName = form.categoryName.value
//         const subCategoryNameUserCase = form.subCategoryName.value
//         const subCategoryName = subCategoryNameUserCase.toLowerCase()
//         const amountStr = parseFloat(form.amount.value).toFixed(2)
//         const amount = parseFloat(amountStr)


//         const editcategoryInfo = {
//             id: editCateInfo._id,
//             dateWithTime,
//             categoryName,
//             subCategoryName,
//             amount,


//         }
//         // console.log(categoryInfo)
//         fetch(`https://printers-server.vercel.app/editCategory`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//                 authorization: `bearer ${localStorage.getItem("accessToken")}`
//             },
//             body: JSON.stringify(editcategoryInfo)
//         })
//             .then(res => res.json())
//             .then(data => {
//                 if (data.modifiedCount === 1) {
//                     setShowEditModal(false)
//                     categoriesRefetch()
//                     // console.log(data)
//                 }

//             })
//     }

//     // create new category field
//     const createCateHandler = (event) => {
//         event.preventDefault()
//         const form = event.target
//         const newCategoryName = form.newCategoryName.value
//         const id = categoriesCollection._id
//         // console.log(id)
//         const insertData = {
//             newCategoryName,
//             id
//         }
//         fetch('https://printers-server.vercel.app/newCategory', {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//                 authorization: `bearer ${localStorage.getItem("accessToken")}`
//             },
//             body: JSON.stringify(insertData)
//         })
//             .then(res => res.json())
//             .then(data => {
//                 if (data.modifiedCount === 1) {
//                     setShowNewCateModal(false)
//                     refetch()
//                 }
//                 // console.log(data)
//             })
//     }



//     return (
//         <div className='mb-24'>
//             <div className='lg:flex lg:justify-between lg:w-2/3 w-4/5 mx-auto'>
//                 <div>
//                     <DayPicker
//                         mode="single"
//                         selected={selectedDate}
//                         onSelect={data => {
//                             if (data) {
//                                 setSelectedDate(data)
//                             }
//                         }}
//                     />
//                 </div>
//                 <div className='text-center  lg:h-20 h-20 lg:mt-28 lg:px-10  mt-10 px-5 pt-4 bg-slate-300'>
//                     <div>
//                         CAREFULLY INSERT DATA FOR THE DATE OF <span className=' text-xl font-bold block'>{date}</span>
//                     </div>
//                 </div>
//             </div>
//             <div className="divider mt-5">Insert Section</div>
//             <div className='mt-5 lg:flex lg:mx-7 mx-3 gap-5 '>
//                 <div className='lg:w-1/6 w-full  lg:h-screen h-36 bg-slate-300 lg:sticky top-0 text-center pt-5 lg:pt-5'>
//                     <div className='lg:p-3'>
//                         <p className='text-xl font-bold lg:mb-10 mb-2'>{date}</p>
//                         <label onClick={() => { setShowModal(true) }} htmlFor="my-modal-3" className="btn btn-ghost lg:w-full">Insert Data</label>
//                         <label onClick={() => { setShowNewCateModal(true) }} htmlFor="createCateModal" className="btn btn-ghost lg:w-full mt-4 lg:ml-0 ml-7">Create New Category</label>
//                     </div>
//                 </div>
//                 <div className="divider lg:divider-horizontal"></div>
//                 <div>
//                     {
//                         categoriesInfo.length > 0 ? <div className="overflow-x-auto tableDesign">
//                             <table className="table  w-full ">
//                                 <thead>
//                                     <tr>
//                                         <th></th>
//                                         <th>Date</th>
//                                         <th>Item</th>
//                                         <th>Sub-Item</th>
//                                         <th>Amount(tk)</th>
//                                         <th>Edit</th>
//                                         <th>Delete</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {
//                                         categoriesInfo && categoriesInfo.map((cateInfo, i) => <tr key={cateInfo._id} className="hover">
//                                             <th>{i + 1}</th>
//                                             <td>{cateInfo?.date}</td>
//                                             <td>{cateInfo?.categoryName}</td>
//                                             <td>{cateInfo?.subCategoryName || "No Sub-Item"}</td>

//                                             <td>{cateInfo?.amount} /-</td>
//                                             <td><label onClick={() => editHandler(cateInfo)} htmlFor="editModal" className='btn btn-xs px-3 bg-blue-500'
//                                             >Edit</label></td>
//                                             <td><button onClick={() => categoryDeleteHandler(cateInfo)} className='btn btn-xs bg-red-500'
//                                             >Delete</button></td>

//                                         </tr>
//                                         )
//                                     }

//                                 </tbody>
//                                 <tfoot>
//                                     <tr>
//                                         <th></th>
//                                         <th>Date</th>
//                                         <th>Item</th>
//                                         <th>Sub-Item</th>
//                                         <th>Amount(tk)</th>
//                                         <th>Edit</th>
//                                         <th>Delete</th>
//                                     </tr>
//                                 </tfoot>
//                             </table>
//                         </div> : <div className='text-center text-xl text-red-400 font-semibold'><p > No data available! Please Insert.</p></div>
//                     }

//                 </div>
//             </div>


//             {/* Modal section */}
//             {/* insert category info */}
//             {
//                 showModal && <div>
//                     <input type="checkbox" id="my-modal-3" className="modal-toggle" />
//                     <div className="modal">
//                         <div className="modal-box relative">
//                             <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
//                             <form onSubmit={inputFormHandler}>
//                                 <div className="form-control w-full">
//                                     <label className="label">
//                                         <span className="label-text">Date?</span>
//                                     </label>
//                                     <input name='date' placeholder="Date" className="input input-bordered w-full" required value={date} disabled />

//                                 </div>
//                                 <div className="form-control w-full">
//                                     <label className="label">
//                                         <span className="label-text">Category Name?</span>
//                                     </label>
//                                     <select name="categoryName" className="input input-bordered w-full" required >
//                                         {
//                                             allCategories.map((category, index) => <option
//                                                 key={index}
//                                                 value={category}
//                                             >{category}</option>)
//                                         }
//                                     </select>

//                                 </div>

//                                 <div className="form-control w-full">
//                                     <label className="label">
//                                         <span className="label-text">Sub-Category Name?</span>
//                                     </label>
//                                     <input name='subCategoryName' type="text" placeholder="Sub-Category Name" className="input input-bordered w-full" />
//                                 </div>
//                                 <div className="form-control w-full">
//                                     <label className="label">
//                                         <span className="label-text">Amount?</span>
//                                     </label>
//                                     <input name='amount' type="number" step="0.01" placeholder="Amount(tk)" className="input input-bordered w-full" required />

//                                 </div>
//                                 <button className='btn btn-outline w-full mt-5' type="submit">Submit</button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             }
//             <div>
//                 <Toaster></Toaster>
//             </div>
//             <div>
//                 {
//                     showEditModal && <div>
//                         <input type="checkbox" id="editModal" className="modal-toggle" />
//                         <div className="modal">
//                             <div className="modal-box relative">
//                                 <label htmlFor="editModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
//                                 <form onSubmit={editFormHandler}>
//                                     <div className="form-control w-full">
//                                         <label className="label">
//                                             <span className="label-text">Date?</span>
//                                         </label>
//                                         <input name='date' placeholder="Date" className="input input-bordered w-full" required value={date} disabled />

//                                     </div>
//                                     <div className="form-control w-full">
//                                         <label className="label">
//                                             <span className="label-text">Category Name?</span>
//                                         </label>
//                                         <input name="categoryName" className="input input-bordered w-full" required defaultValue={editCateInfo.categoryName} disabled>
//                                         </input>

//                                     </div>

//                                     <div className="form-control w-full">
//                                         <label className="label">
//                                             <span className="label-text">Sub-Category Name?</span>
//                                         </label>
//                                         <input name='subCategoryName' type="text" placeholder="Sub-Category Name" className="input input-bordered w-full" defaultValue={editCateInfo.subCategoryName} />
//                                     </div>
//                                     <div className="form-control w-full">
//                                         <label className="label">
//                                             <span className="label-text">Amount?</span>
//                                         </label>
//                                         <input name='amount' type="number" step="0.01" placeholder="Amount(tk)" className="input input-bordered w-full" defaultValue={editCateInfo.amount} required />

//                                     </div>
//                                     <button className='btn btn-outline w-full mt-5' type="submit">Submit</button>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 }
//             </div>
//             <div>
//                 {
//                     showNewCateModal && <div>
//                         <input type="checkbox" id="createCateModal" className="modal-toggle" />
//                         <div className="modal">
//                             <div className="modal-box relative">
//                                 <label htmlFor="createCateModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
//                                 <form onSubmit={createCateHandler}>
//                                     <div className="form-control w-full">
//                                         <label className="label">
//                                             <span className="label-text">New Category Name?</span>
//                                         </label>
//                                         <input name='newCategoryName' placeholder="Enter New Category Name" className="input input-bordered w-full" required />

//                                     </div>
//                                     <div className='text-center'>
//                                         <button className='btn btn-outline w-1/3  mt-5' type="submit">Submit</button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 }
//             </div>
//         </div>
//     );
// };

// export default Add;