import React, { useState, Fragment, useEffect } from 'react'
import Calendar from 'react-calendar'
import { useHistory } from "react-router-dom"
import { Bar } from 'react-chartjs-2'
import axios from 'axios'
import 'react-calendar/dist/Calendar.css'
// import { Row, Col, Form } from 'react-bootstrap'

export default function OrderAdmin() {

    const formartter = new Intl.NumberFormat('en');

    const [date, setDate] = useState(new Date()); // current day
    let firstDate = new Date(); // firstDate is yesterday of date
    let secondDate = new Date(); // secondDate is yesterday of firstDate
    let thirdDate = new Date(); // and so on ...
    let fourthDate = new Date();

    let currDate = new Date();

    const dataOrder = {
        totalOrder: GetRandomNumber(date, 1, 35),
        // cancelOrder: GetRandomNumber(date, 0, 20),
        // totalProduct: 133,
        // importProduct: GetRandomNumber(date, 0, 10),
        profit: GetRandomNumber(date, 10000000, 200000000)
        // deposit: GetRandomNumber(date, 10000000, 80000000),
        // totalComplaint: GetRandomNumber(date, 0, 10),
        // performance: 100
    };

    //const [showCalendar, setShowCalendar] = useState(true);

    function GetRandomNumber(date, min, max) {
        // let currDate = new Date();
        if (date.getTime() > currDate.getTime()) {
            return 0;
        }
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function onChange(date) {
        setDate(date);
        // <HandleChange date={date} />;
    };

    function GetPreviousDate(date) {
        let yesterday = new Date();
        yesterday.setFullYear(date.getFullYear());
        yesterday.setMonth(date.getMonth());
        yesterday.setDate(date.getDate());

        if (date.getDate() == 1 && date.getMonth() == 1) {
            yesterday.setFullYear(date.getFullYear() - 1);
            yesterday.setMonth(date.getMonth() - 1);
        }
        yesterday.setDate(date.getDate() - 1);
        return yesterday;
    }


    firstDate = GetPreviousDate(date);
    secondDate = GetPreviousDate(firstDate);
    thirdDate = GetPreviousDate(secondDate);
    fourthDate = GetPreviousDate(thirdDate);

    function GetDate(date) {
        let dayOfWeek = date.getDay();
        let day = date.getDate();
        let month = date.getMonth();
        month += 1;
        let year = date.getFullYear();

        return [dayOfWeek, day, month, year];
    }

    function getDayOfWeek(dayOfWeek) {
        switch (dayOfWeek) {
            case 0:
                dayOfWeek = "Chủ nhật";
                break;
            case 1:
                dayOfWeek = "Thứ 2";
                break;
            case 2:
                dayOfWeek = "Thứ 3";
                break;
            case 3:
                dayOfWeek = "Thứ 4";
                break;
            case 4:
                dayOfWeek = "Thứ 5";
                break;
            case 5:
                dayOfWeek = "Thứ 6";
                break;
            default:
                dayOfWeek = "Thứ 7";
                break;
        }
        return dayOfWeek;
    }

    let dayOfWeek, day, month, year;

    let dateInfo = [dayOfWeek, day, month, year];
    dateInfo = GetDate(date);
    dateInfo[0] = getDayOfWeek(dateInfo[0]);

    let firstdateInfo = [dayOfWeek, day, month, year];
    firstdateInfo = GetDate(firstDate);
    firstdateInfo[0] = getDayOfWeek(firstdateInfo[0]);

    let seconddateInfo = [dayOfWeek, day, month, year];
    seconddateInfo = GetDate(secondDate);
    seconddateInfo[0] = getDayOfWeek(seconddateInfo[0]);

    let thirddateInfo = [dayOfWeek, day, month, year];
    thirddateInfo = GetDate(thirdDate);
    thirddateInfo[0] = getDayOfWeek(thirddateInfo[0]);

    let fourthdateInfo = [dayOfWeek, day, month, year];
    fourthdateInfo = GetDate(fourthDate);
    fourthdateInfo[0] = getDayOfWeek(fourthdateInfo[0]);

    function GetStringDate(date) {
        return date[0] + " - " + date[1] + "/" + date[2] + "/" + date[3];
    }

    const dataFake = {
        totalOrder1: GetRandomNumber(firstDate, 1, 35),
        totalOrder2: GetRandomNumber(secondDate, 1, 35),
        totalOrder3: GetRandomNumber(thirdDate, 1, 35),
        totalOrder4: GetRandomNumber(fourthDate, 1, 35)
    }
    
    const history = useHistory();
    const [dele, setDele] = useState(false)
    const [customerData, setCustomerData] = useState()
    const [priceData, setPriceData] = useState()

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get('http://localhost:8080/cart/list')
                setCustomerData(res.data)
                //console.log(res.data)
            } catch (error) {
                console.log(error.message)
            }
        }
        getData()
    }, [dele])

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get('http://localhost:8080/cart/detail')
                setPriceData(res.data)
                //console.log(res.data)
            } catch (error) {
                console.log(error.message)
            }
        }
        getData()
    }, [dele])

    async function remove(e) {
        try {
            const res = await axios.delete('http://localhost:8080/cart/delete'
                ,
                {
                    params: {
                        id: parseInt(e.target.name)
                    }
                }
            )
            setDele(!dele)
        } catch (error) {
            console.log(error.message)
        }
    }

    function CustomerList(props) {
        let buyDate = (new Date(props.item.Buy_Time)).toLocaleDateString();
        return (
            <>
                <tr className="text-center">
                    <td>{props.item.Id_Cart}</td>
                    <td>{props.item.Name_Client}</td>
                    <td>{props.item.Address_Client}</td>
                    <td>{props.item.Phone_Client}</td>
                    <td>{props.item.Email_Client}</td>
                    <td>{props.item.Pay_Method}</td>
                    {/* <td>{buyDate.getDate()}/{buyDate.getMonth()}/{buyDate.getFullYear()}</td> */}
                    <td>{buyDate}</td>
                    {/* <td>{CalculateTotalOrder}</td> */}
                </tr>
            </>
        );
    }

    function ListCustomer() {
        return <Fragment>{
            customerData && customerData.map((item) => {
                return (
                    <CustomerList item={item} />
                )
            })}
        </Fragment>
    }

    function RenderCustomer() {
        return <Fragment>
            <div class="table-responsive mt-3 mb-5">
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr class="table-primary text-center">
                            <th>Giỏ hàng</th>
                            <th>Tên khách hàng</th>
                            <th>Địa chỉ khách hàng</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Phương thức thanh toán</th>
                            <th>Ngày mua</th>
                            {/* <th>Đơn giá</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        <ListCustomer />
                    </tbody>
                </table>
            </div>
        </Fragment>
    }

    // function Test(props) {
    //     if (tempBuyDate != "") {
    //         if (props.item.Buy_Time != tempBuyDate) {
    //             numOrder[indexNumOrder] = countNumOrder;
    //             indexNumOrder += 1;
    //             countNumOrder = 1;
    //         }
    //         else {
    //             countNumOrder += 1;
    //         }
    //     }
    //     tempBuyDate = props.item.Buy_Time;
    // }

    // function CalculateTotalOrder() {
    //     return <Fragment>{
    //         priceData && priceData.map((priceItem) => {
    //             return (
    //                 // <CustomerList item={priceItem} />
    //                 priceItem
    //             )
    //         })
    //     }
    //     </Fragment>
    // }

    // function CalculateProfit() {

    // }

    

    return (
        <div className="my-5 container">
            <div className="row">
                <div className="col-6">
                    <h3 className="mt-3">Thời gian</h3>
                    {/* <div className="mb-3">
                        <button className="btn-primary col-sm-1" onClick={() => setShowCalendar(true)}>
                            <i class="far fa-clock"></i> Hiện
                        </button>
                        <button className="btn-warning col-sm-1" onClick={() => setShowCalendar(false)}>
                            <i class="fas fa-stopwatch"></i> Ẩn
                        </button>
                    </div>
                    {showCalendar ? <div className="mb-5">  <Calendar onChange={onChange} value={date} /> </div> : null} */}
                    <div className="mb-5">  <Calendar onChange={onChange} value={date} /> </div>
                    {console.log(date)}
                </div>
                <div className="col-6 mt-5 fw-bold">
                    <div className="p-lg-3" style={{
                        backgroundColor: "#C4C4C4", borderStyle: "solid",
                        borderWidth: "2px"
                    }}>
                        <div className="row">
                            <div className="col-4 ms-2">
                                <i class="fas fa-file-invoice "></i> Tổng số hóa đơn
                            </div>
                            <div className="col-7 text-end">
                                {dataOrder.totalOrder}
                                {/* {numOrder[4]} */}
                            </div>
                        </div>
                    </div>
                    <div className="p-lg-3" style={{
                        // backgroundColor: "#C4C4C4", 
                        borderStyle: "solid",
                        borderWidth: "2px"
                    }}>
                        <div className="row">
                            <div className="col-4 ms-2">
                                <i class="fas fa-money-bill-wave-alt"></i> Doanh thu
                            </div>
                            <div className="col-7 text-end">
                                {formartter.format(dataOrder.totalOrder * 21700000)}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <RenderCustomer className="mt-5" />

            <Bar
                data={{
                    labels: [GetStringDate(fourthdateInfo), GetStringDate(thirddateInfo),
                    GetStringDate(seconddateInfo), GetStringDate(firstdateInfo), GetStringDate(dateInfo)],
                    datasets: [
                        {
                            label: 'Số đơn hàng',
                            data: [dataFake.totalOrder4, dataFake.totalOrder3,
                            dataFake.totalOrder2, dataFake.totalOrder1, dataOrder.totalOrder],
                            backgroundColor: '#f73600',
                            borderColor: 'black',
                            borderWidth: 2,
                            barPercentage: 0.4,
                            hoverBackgroundColor: '#f7a436',
                            hoverBorderColor: '#8f8d8c'
                        },
                        {
                            label: 'Doanh thu',
                            data: [dataFake.totalOrder4 * 25300000, dataFake.totalOrder3 * 15000000,
                            dataFake.totalOrder2 * 12800000, dataFake.totalOrder1 * 17000000, dataOrder.totalOrder * 21700000],
                            backgroundColor: '#2980b9',
                            borderColor: 'black',
                            borderWidth: 2,
                            barPercentage: 0.4,
                            hoverBackgroundColor: '#b3ccff',
                            hoverBorderColor: '#34495e'
                        },
                        // {
                        //     label: 'Số hóa đơn hủy',
                        //     data: [GetRandomNumber(fourthDate, 0, 20), GetRandomNumber(thirdDate, 0, 20),
                        //     GetRandomNumber(secondDate, 0, 20), GetRandomNumber(firstDate, 0, 20), dataOrder.cancelOrder],
                        //     backgroundColor: '#16a085',
                        //     borderColor: 'black',
                        //     borderWidth: 3,
                        //     barPercentage: 0.5,
                        //     hoverBackgroundColor: '#2ecc71',
                        //     hoverBorderColor: '#34495e'
                        // },
                    ]
                }}

                width={100}
                height={50}
                options={{
                    // maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom',
                            labels: {
                                // This more specific font property overrides the global property
                                font: {
                                    size: 18
                                }
                            }
                        },
                        title: {
                            display: true,
                            text: 'Dữ liệu thống kê trong ngày',
                            padding: {
                                top: 10,
                                bottom: 30
                            },
                            font: {
                                size: 35
                            }
                        }
                    }
                }}
            />
        </div >
    );
}
