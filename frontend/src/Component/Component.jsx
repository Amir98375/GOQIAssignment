import axios from "axios";
import React, { useEffect, useState } from "react";
import "./component.css";

import { ReactUtilityTable } from "react-utility-table";
import Swal from "sweetalert2";

export const Component = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    date: "",
  });

  useEffect(() => {
    initialCall();
  }, []);

  const initialCall = () => {
    debugger;
    axios.get("http://localhost:5000/todos").then((resp) => {
      console.log(resp, "response called");
      setData(resp.data);
    });
  };
  const postData = (e) => {
    e.preventDefault();
    let obj = {
      name: formData.name,
      password: formData.password,
      email: formData.email,
      dob: formData.date,
    };
    axios.post("http://localhost:5000/todos", obj).then((resp) => {
      console.log(resp, "resp");
      if (resp.data.flag === 1) {
        Swal.fire({
          // title: "Enter Name Of Assignee",
          text: resp.data.message, 
          icon: "success",
        }).then((el) => {
          if (el.isConfirmed) {
            setFormData({
              name: "",
              email: "",
              password: "",
              date: "",
            });
            initialCall()
          }
        });
      }else{
        Swal.fire({
            // title: "Enter Name Of Assignee",
            text: 'something went wrong',
            icon: "error",
          }).then((el) => {
            if (el.isConfirmed) {
              setFormData({
                name: "",
                email: "",
                password: "",
                date: "",
              });
            }
          });
      }
      //  console.log(resp.message)
    });
    console.log(e, "event", formData);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div>
      <form onSubmit={postData}>
        <div className="container">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="inputbox"
            value={formData.name}
          />
          <br />
          <br />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="inputbox"
            value={formData.email}
          />
          <br />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="inputbox"
            value={formData.password}
          />
          <br />
          <br />
          <label htmlFor="Date of Birth"></label>
          <input
            type="date"
            name="date"
            placeholder="Date of Birth"
            onChange={handleChange}
            className="inputbox"
            value={formData.date}
          />
          <br />
          <br />
        </div>
        <br />
        <button
          type="submit"
          style={{
            height: "40px",
            width: "100px",
            borderRadius: "20px",
            backgroundColor: "black",
            color: "white",
          }}
        >
          Click Here
        </button>
      </form>
      <ReactUtilityTable
        style={{ width: "100%" }}
        title={"All Data"}
        columns={[
          {
            title: "Name",
            field: "name",
          },
          {
            title: "email",
            field: "email",
          },
          {
            title: "password",
            field: "password",
          },
          {
            title: "Date Of Birth",
            field: "dob",
            type: "date",
          },
        ]}
        options={{
          headerStyle: {
            backgroundColor: "#14a4de",
            color: "#FFF",
            whiteSpace: "nowrap",
            padding: 0,
          },
        }}
        data={data}
        actions={
          [
            // {
            //     icon: 'delete',
            //     onClick: (evt, rowData) =>
            //         dialogOpen(rowData)
            // }
            // {
            //     icon: () => <Exportexcel columns={tableColumn} excelName={props.t("list_of_rejected_customer")} excelData={tableData} />,
            //     tooltip: props.t("download_excel"),
            //     isFreeAction: true,
            // }
          ]
        }
      />
    </div>
  );
};
