import { useQuery } from '@tanstack/react-query';
import { setYear } from 'date-fns';
import React from 'react';
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import ReactHtmlTableToExcel from 'react-html-table-to-excel';
import Loading from '../Components/Loading';

const ShowByCatg = () => {
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [category, setCategory] = useState('')
    const [showEditModal, setShowEditModal] = useState(true)
    const [editCateInfo, setEditCateInfo] = useState({})
    const [editProcessing, setEditProcessing] = useState(false)


    const { data: categoriesInfo = [], isLoading: categoriesIsLoading, refetch: categoriesRefetch } = useQuery({
        queryKey: ["categoriesByName", year, month, category],
        queryFn: async () => {
            const res = await fetch(`https://printers-server.vercel.app/categoriesByName?month=${month}&year=${year}&category=${category}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = res.json()
            return data

        }
    })
    // console.log(categoriesInfo)
    let sum = 0;
    categoriesInfo.map(category => {
        sum = sum + category.amount
        return sum
    })

    const { data: categoriesCollection = [], isLoading, refetch } = useQuery({
        queryKey: ["allCategories"],
        queryFn: async () => {
            const res = await fetch('https://printers-server.vercel.app/allCategories', {

                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json()
            return data[0].categories
        }
    })
    const allCategories = categoriesCollection.sort()
    const monthCollection = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    const collectMonthHandler = (event) => {
        event.preventDefault()
        const form = event.target
        const userMonth = form.userMonth.value + ''
        const userYear = form.userYear.value + ''
        const categoryName = form.categoryName.value
        // console.log(userMonth, userYear, categoryName)
        setYear(userYear)
        setMonth(userMonth)
        setCategory(categoryName)

    }
    // edit..
    const editHandler = (cateInfo) => {
        setEditCateInfo(cateInfo)
        setShowEditModal(true)
    }
    const editFormHandler = (event) => {
        event.preventDefault()
        const form = event.target
        const categoryName = form.categoryName.value
        const subCategoryNameUserCase = form.subCategoryName.value
        const subCategoryName = subCategoryNameUserCase.toLowerCase()
        const amountStr = parseFloat(form.amount.value).toFixed(2)
        const amount = parseFloat(amountStr)

        setEditProcessing(true)
        const editcategoryInfo = {
            id: editCateInfo._id,
            categoryName,
            subCategoryName,
            amount,


        }
        // console.log(categoryInfo)
        fetch(`https://printers-server.vercel.app/editCategory`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(editcategoryInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount === 1) {
                    setEditProcessing(false)
                    setShowEditModal(false)
                    categoriesRefetch()
                    // console.log(data)
                }
                if (data.modifiedCount !== 1) {
                    setEditProcessing(false)

                }

            })
    }
    // ..Delete
    const categoryDeleteHandler = (cateInfo) => {
        const confirm = window.confirm(`Are you sure you want to delete ${cateInfo.categoryName} category and ${cateInfo.subCategoryName} sub-category `)
        if (confirm) {
            fetch(`https://printers-server.vercel.app/deleteCategory?id=${cateInfo._id}`, {
                method: "DELETE",
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                },
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        categoriesRefetch()
                        toast.success('Successfully deleted!')

                    }

                })
        }
    }

    return (
        <div>
            <div className='lg:ml-8 lg:mt-8 ml-10 mt-10'>
                <form onSubmit={collectMonthHandler} >
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text font-bold">Select Category Name?</span>
                        </label>
                        <select name="categoryName" className="input input-bordered w-full" required >
                            {
                                allCategories.map((category, index) => <option
                                    key={index}
                                    value={category}
                                >{category}</option>)
                            }
                        </select>

                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text font-bold">Select a Month from here</span>
                        </label>
                        <select name="userMonth" className="input input-bordered w-full" required>
                            {
                                monthCollection.map((month, i) =>
                                    <option
                                        key={i}
                                        value={month}
                                    >{month}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text font-bold">Enter Year?</span>
                        </label>
                        <input name='userYear' type="number" placeholder="Enter Year (Ex: 2023)" className="input input-bordered w-full" required />

                    </div>
                    <button onClick={categoriesRefetch} className='btn btn-outline mt-5' type="submit">Submit</button>
                </form>

            </div>
            <div>
                {
                    categoriesInfo.length > 0 && <div className='flex justify-end lg:mr-10 mr-3 lg:mt-0 mt-4'>
                        <ReactHtmlTableToExcel
                            id="test-table-xls-button"
                            className="btn btn-success btn-outline"
                            table="table-to-xls"
                            filename={`${month}, ${year} for ${category}`}
                            sheet={`${month}, ${year} for ${category}`}
                            buttonText="Export Excel" />
                    </div>
                }
            </div>
            <div className='divider'></div>
            <div>
                {
                    categoriesInfo.length > 0 ?
                        <div>
                            <div className="overflow-x-auto tableDesign">
                                <table id="table-to-xls" className="table  w-full ">
                                    {/* <tbody> */}
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Date</th>
                                            <th>Item</th>
                                            <th>Sub-Item</th>
                                            <th>Amount(tk)</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            categoriesInfo && categoriesInfo.map((cateInfo, i) => <tr key={cateInfo._id} className="hover">
                                                <th>{i + 1}</th>
                                                <td>{cateInfo?.date}</td>
                                                <td>{cateInfo?.categoryName}</td>
                                                <td>{cateInfo?.subCategoryName || "No Sub-Item"}</td>

                                                <td>{cateInfo?.amount} /-</td>
                                                <td><label onClick={() => editHandler(cateInfo)} htmlFor="editModal" className='btn btn-xs px-3 bg-blue-500'
                                                >Edit</label></td>
                                                <td><button onClick={() => categoryDeleteHandler(cateInfo)} className='btn btn-xs bg-red-500'
                                                >Delete</button></td>

                                            </tr>
                                            )
                                        }

                                    </tbody>
                                    {/* <tfoot>
                                        <tr>
                                            <th></th>
                                            <th>Date</th>
                                            <th>Item</th>
                                            <th>Sub-Item</th>
                                            <th>Amount(tk)</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>

                                    </tfoot> */}

                                </table>

                            </div>
                            <div className='divider mb-1'></div>
                            <div className='flex justify-end '>

                                <div className='lg:mr-20 mr-5 font-bold mb-5 text-primary'>
                                    <span className='lg:mr-20 mr-5'>Total Cost Amount on {month},  {year} for {category} :</span> {sum.toFixed(2)} /-
                                </div>
                            </div>
                        </div> : <div>
                            {categoriesIsLoading ? <div className='text-center text-xl text-green-400 font-semibold  my-40'><p >Data Loading...</p></div> :
                                <div className='text-center text-xl text-red-400 font-semibold  my-40'><p > No data available</p></div>
                            }
                        </div>
                }
            </div>
            <Toaster></Toaster>
            <div>
                {
                    showEditModal && <div>
                        <input type="checkbox" id="editModal" className="modal-toggle" />
                        <div className="modal">
                            <div className="modal-box relative">
                                <label htmlFor="editModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                <form onSubmit={editFormHandler}>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Date?</span>
                                        </label>
                                        <input name='date' placeholder="Date" className="input input-bordered w-full" required value={editCateInfo.date} disabled />

                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Category Name?</span>
                                        </label>
                                        <input name="categoryName" className="input input-bordered w-full" required defaultValue={editCateInfo.categoryName} disabled>
                                        </input>

                                    </div>

                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Sub-Category Name?</span>
                                        </label>
                                        <input name='subCategoryName' type="text" placeholder="Sub-Category Name" className="input input-bordered w-full" defaultValue={editCateInfo.subCategoryName} />
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Amount?</span>
                                        </label>
                                        <input name='amount' type="number" step="0.01" placeholder="Amount(tk)" className="input input-bordered w-full" defaultValue={editCateInfo.amount} required />

                                    </div>
                                    <button className='btn btn-outline w-full mt-5' type="submit" disabled={editProcessing}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default ShowByCatg;