import React, { useEffect, useState } from 'react'
import ReactModal from "react-modal";
import Edit from '../icons/edit'

const Dashboard = () => {

    const state = [
        { id: 0, name: "Rachel Green", category: "teenage", age: 8, email: "rachelgreen88@gmail.com", phone: "9889897876" },
        { id: 1, name: "Monica Gartner", category: "young adults", age: 20, email: "monicagartner3@gmail.com", phone: "9889897876" },
        { id: 2, name: "Lucifer Morningstar", category: "adults", age: 30, email: "luciferdevil@gmail.com", phone: "9889897876" },
        { id: 3, name: "Chandler Bing", category: "oldage", age: 50, email: "chandlerbing20@gmail.com", phone: "9889897876" }
    ]

    const [dataArray, setDataArray] = useState(state)
    const [cardSelected, setCardSlected] = useState()
    const [dropIndicator, setDropIndicator] = useState()
    const [dataExists, setDataExists] = useState(true)

    const handleDrag = (e, id) => {
        e.dataTransfer.setData('text/plain', id.toString())
        setCardSlected(id)
    }
    const handleDragEnd = (e) => {
        e.dataTransfer.clearData()
        setCardSlected()
    }

    const onDrop = (e, category) => {
        e.preventDefault();
        const ageId = e.dataTransfer.getData('text/plain')
        console.log(ageId);
        setDataArray((prevData) => {
            return prevData.map((data) => {
                console.log("true");
                console.log("data.id", data.id);
                console.log("ageId", ageId);
                if (data.id === +ageId) {
                    console.log("true");
                    return { ...data, category }
                }
                console.log(data);
                return data
            })
        })
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        setDropIndicator(e.currentTarget.id)
    }

    document.body.addEventListener("click", function (evt) {
        setCardSlected();
        setDropIndicator();
        console.log("clicked");
    });

    const displayData = (category) => {
        return dataArray.filter((data) => data.category === category).map((data) => {
            return <div
                key={data.id}
                draggable
                onDragStart={(e) => {
                    console.log("Dragging element")
                    handleDrag(e, data.id)
                }}
                onDragEnd={(e) => {
                    console.log("dropping element")
                    handleDragEnd(e)

                }}
            >
                <div className={`${cardSelected == data.id ? "userCardSelected" : "userCard"}`}>
                    <div className='flex-between-top'>
                        <div>
                            <div className={`${cardSelected == data.id ? "userCardHeadingSelected" : "userCardHeading"}`}>
                                {data.name}
                            </div>
                            <div className={`${cardSelected == data.id ? "userCardSubHeadingSelected" : "userCardSubHeading"}`}>
                                {data.email}
                                <div>{data.phone}</div>
                            </div>
                        </div>
                        <div className={`${cardSelected == data.id ? "ageTextSelected" : "ageText"}`}>
                            {data.age}Y/O
                        </div>
                    </div>
                    <div className='flex-between-center'>
                        <div className={`${cardSelected == data.id ? "tagSelected" : "tag"}`}>{data.category}</div>
                        <div onClick={() => {
                            openModal();
                            editUserModal(data.id);
                        }} style={{ cursor: "pointer" }}>
                            <Edit strokeColor={cardSelected == data.id ? "#ffffff" : "#7498fb"} />
                        </div>
                    </div>
                </div>
            </div>

        })
    }

    const customStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)'
        },
        content: {
            width: "40%",
            height: "80%",
            // height: "90%",
            margin: "auto",
            backgroundColor: "#fff",
            padding: "1rem",
            borderRadius: "15px",
            // border: "1px solid rgba(6, 6, 6, 0.2)",
            boxShadow: "1px 1px 1px 1px rgba(86, 85, 85, 0.2)",
            position: "absolute",
            top: "5%",
            left: "31%"
        },
    };

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
        setFirstname()
        setEmail()
        setPhone()
        setAge()
    }

    const [isDisabled, setIsDisabled] = useState(true);
    const [edit, setEdit] = useState(false);
    const [idN, setIdN] = useState(0);



    const [firstname, setFirstname] = useState();
    const handleName = (e) => {
        setFirstname(e.target.value)
        if (firstname && email && phone && age) {
            setIsDisabled(false)
        }
    }
    const [email, setEmail] = useState();
    const handleEmail = (e) => {
        setEmail(e.target.value)
        if (firstname && email && phone && age) {
            setIsDisabled(false)
        }
    }
    const [phone, setPhone] = useState();
    const handleNumber = (e) => {
        const validatedValue = e.target.value.toString().replace(/[^0-9]/g, "");
        setPhone(validatedValue);
        if (firstname && email && phone && age) {
            setIsDisabled(false)
        }
    }
    const [age, setAge] = useState();
    function categoryAdded(age) {
        console.log(typeof (age));
        if (age < 19) {
            setCategoryName("teenage")
        } else if (age > 18 && age < 26) {
            setCategoryName("young adults")
        } else if (age > 25 && age < 46) {
            setCategoryName("adults")
        } else {
            setCategoryName("oldage")
        }
    }
    const handleAge = (e) => {
        const validatedValue = e.target.value.toString().replace(/[^0-9]/g, "");
        console.log(validatedValue);
        setAge(validatedValue);
        categoryAdded(parseInt(validatedValue))
        if (firstname && email && phone && age) {
            setIsDisabled(false)
        }
    }

    const [categoryName, setCategoryName] = useState("")



    const addNewUser = () => {
        dataArray.push({ id: dataArray.length, name: firstname, category: categoryName, age: age, email: email, phone: phone })
        console.log(dataArray);
        closeModal()


    }
    const editUser = () => {
        const id = idN
        dataArray[id] = { id: dataArray[id].id, name: firstname, category: categoryName, age: age, email: email, phone: phone }
        console.log(dataArray);
        closeModal()


    }

    const editUserModal = (idx) => {
        setIdN(dataArray[idx].id)
        setFirstname(dataArray[idx].name)
        setEmail(dataArray[idx].email)
        setPhone(dataArray[idx].phone)
        setAge(dataArray[idx].age)
        setEdit(true)
        // editUser(dataArray[id])
    }
    return (
        <div style={{ backgroundColor: "#F3F4F8" }}>
            <div
            >
                <div
                    style={{ maxWidth: "100vw", height: "10vh", zIndex: 10, backgroundColor: "#FFFFFF", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
                    className='flex-between-center'
                >
                    <div style={{ display: "flex", gap: "0.2rem", alignItems: "center", paddingLeft: "2rem" }}>
                        <div><img src='/images/users.svg' width={"35px"} /></div>
                        <div className='pageHeading'>USER DIARY</div>
                    </div>
                    <div style={{ paddingRight: "2rem", }}>
                        <div
                            style={{ borderRadius: "15px", cursor: "pointer", display: "flex", gap: "0.5rem", alignItems: "center", }}
                        >
                            <img
                                style={{
                                    width: "30px",
                                    height: "30px",
                                    padding: "8px",
                                    backgroundColor: "#f1f4ff",
                                    borderRadius: "100px",
                                }}
                                src='/images/user.svg'
                            />
                            <p style={{ fontSize: "14px", fontWeight: "bold", color: "#000" }}>
                                HAFSA MARYAM
                            </p>
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex" }}>
                    <div style={{ height: "90vh", width: "5vw", backgroundColor: "#FFFFFF", display: "flex", flexDirection: "column", gap: "2rem", justifyContent: "center", alignItems: "center" }}>
                        <div><img src='/images/home.svg' width={"35px"} /></div>
                        <div><img src='/images/users.svg' width={"35px"} /></div>

                    </div>
                    <div >
                        <div style={{ width: "93vw" }} className='flex-between-center' >
                            <div className='pageHeading'>
                                User Details
                            </div>
                            <div onClick={openModal}
                                className='addButton'>
                                <div>Add</div>
                                <div><img src='/images/adduser.svg' width={"15px"} /></div>
                            </div>
                        </div>
                        <div
                            style={{ paddingTop: "1rem", display: "flex", justifyContent: "space-around" }}

                        >


                            <div
                                className={`${dropIndicator == "teenage" ? "usersColumnSelected" : "usersColumn"}`}
                                id="teenage"
                                onDragOver={(e) => handleDragOver(e)}
                                onDrop={(e) => onDrop(e, "teenage")}
                            >

                                <div className='categoryHeading'>Teenage</div>
                                <div style={{ height: "0.2rem", width: "60%", borderRadius: "20px", backgroundColor: "#77E0A9" }}>

                                </div>
                                {dataExists ? displayData("teenage") : <div>nodata</div>}
                            </div>
                            <div
                                className={`${dropIndicator == "young adults" ? "usersColumnSelected" : "usersColumn"}`}
                                id="young adults"
                                onDragOver={(e) => handleDragOver(e)}
                                onDrop={(e) => onDrop(e, "young adults")}
                            >
                                <div className='categoryHeading'>Young Adults</div>
                                <div style={{ height: "0.2rem", width: "60%", borderRadius: "20px", backgroundColor: "#EE5756" }}>

                                </div>
                                {displayData("young adults")}
                            </div>
                            <div
                                className={`${dropIndicator == "adults" ? "usersColumnSelected" : "usersColumn"}`}
                                id="adults"
                                onDragOver={(e) => handleDragOver(e)}
                                onDrop={(e) => onDrop(e, "adults")}
                            >
                                <div className='categoryHeading'>Adults</div>
                                <div style={{ height: "0.2rem", width: "60%", borderRadius: "20px", backgroundColor: "#4F4D4F" }}>

                                </div>
                                {displayData("adults")}
                            </div>
                            <div
                                className={`${dropIndicator == "oldage" ? "usersColumnSelected" : "usersColumn"}`}
                                id="oldage"
                                onDragOver={(e) => handleDragOver(e)}
                                onDrop={(e) => onDrop(e, "oldage")}
                            >
                                <div className='categoryHeading'>Old Age</div>
                                <div style={{ height: "0.2rem", width: "60%", borderRadius: "20px", backgroundColor: "#F49C56" }}>

                                </div>
                                {displayData("oldage")}
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            <ReactModal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="PunchIn Modal"
                className={"modal-custom"}

            >
                <div
                    onClick={closeModal}
                    //   className="products__status1 caption btn-del btn-csdang"
                    style={{ float: "right", cursor: "pointer" }}
                >
                    <div><img src='/images/close.svg' width={"35px"} /></div>

                </div>
                <div className='categoryHeading'> Add new user</div>
                <div>
                    <div >
                        <div className="form-label">Name</div>
                        <input
                            type="text"
                            value={firstname}
                            name="first_name"
                            onChange={(e) => handleName(e)}
                            maxLength={84}
                            className="form-control input-sm"
                            placeholder="Full Name"
                            style={{ width: "70%", borderRadius: "12px", border: "1px solid #ced4da", fontSize: "14px", padding: "0.48rem" }}

                        />
                    </div>
                    <div>
                        <div className="form-label">Email</div>

                        <input
                            type="email"
                            value={email}
                            name="email"
                            maxLength={120}
                            onChange={(e) => handleEmail(e)}
                            id="first_name"
                            className="form-control input-sm"
                            placeholder="Email"
                            style={{ width: "70%", borderRadius: "12px", border: "1px solid #ced4da", fontSize: "14px", padding: "0.48rem" }}

                        />
                    </div>
                    <div>
                        <div className="form-label">Phone Number</div>

                        <input
                            type="tel"
                            maxLength={10}
                            name="phone"
                            value={phone}
                            onChange={(e) => handleNumber(e)}
                            className="form-control input-sm"
                            placeholder="Phone"
                            style={{ width: "70%", borderRadius: "12px", border: "1px solid #ced4da", fontSize: "14px", padding: "0.48rem" }}

                        />
                    </div>
                    <div>
                        <div className="form-label">Age</div>

                        <input
                            type="tel"
                            maxLength={3}
                            name="age"
                            value={age}
                            onChange={(e) => handleAge(e)}
                            className="form-control input-sm"
                            placeholder="Phone"
                            style={{ width: "70%", borderRadius: "12px", border: "1px solid #ced4da", fontSize: "14px", padding: "0.48rem" }}

                        />
                    </div>
                    {edit ?
                        <div
                            onClick={isDisabled == false && editUser}
                            className={isDisabled ? "addButtonDisabled" : "addButton"}
                            style={{ width: "10vw", textAlign: "center", marginTop: "2rem", cursor: "pointer" }}

                        >
                            <div>Edit</div>
                            <div><img src='/images/edit.svg' width={"15px"} /></div>
                        </div>
                        :
                        <div
                            onClick={isDisabled == false && addNewUser}
                            className={isDisabled ? "addButtonDisabled" : "addButton"}
                            style={{ width: "10vw", textAlign: "center", marginTop: "2rem", cursor: "pointer" }}

                        >
                            <div>Add</div>
                            <div><img src='/images/adduser.svg' width={"15px"} /></div>
                        </div>
                    }

                </div>
            </ReactModal>


        </div>
    )
}

export default Dashboard
