import React, { useEffect, useState } from 'react'
import './payment_2.css'

const Payment_2 = () => {
    const [choosePlan, setChhosePlan] = useState(false)

    const [plan, setPlan] = useState({
        starterPlan: "",
        proPlan: "",
        days: ""
    })

    const [monthlyPlan, setMontlyPlan] = useState({
        starterPrice: 20,
        proPrice: 200,
        days: "monthly"
    })

    const [yearlyPlan, setYearlyPlan] = useState({
        starterPrice: 200,
        proPrice: 2000,
        days: "yearly"
    })

    useEffect(() => {
        if (!choosePlan) {
            setPlan((states) => {
                return { ...states }
            })
        } else if (choosePlan) {
            setPlan((states) => {
                return {
                    ...states
                }
            })
        }
    }, [choosePlan])

    return (
        <>
            <div className="top-banner">
                <p className="current-plan"> Your current Plan</p>
                <p className="plan-type"> Starter Trial . 500MAUs</p>
            </div>

            <div className="container">
                <h1 className="title">Choose a plan</h1>
                <div className="toggle-switch">
                    <span>Billed anually </span>
                    <input type="checkbox" className="toggler" value={choosePlan.checkbox} onChange={(e) => setChhosePlan(!choosePlan)} />
                    <span> Billed monthly</span>
                </div>

                <div className="cards">

                    {/* <!-- Starter Plan --> */}
                    <div className="card" id="card-1">
                        <h1 className="card-title">Starter</h1>
                        <h2 className="card-price" id="starter-price"> ${plan.starterPlan} <span> / {plan.days}</span> </h2>
                        <ul className="card-plan">
                            <li> 500MAUs</li>
                            <li> 3 projects</li>
                            <li>Unlimted guides</li>
                            <li>Unlimted flows</li>
                            <li>Unlimted branded thems</li>
                            <li>Email Support</li>
                        </ul>
                        <button type="button" className="card-btn"> Choose Plan</button>
                    </div>

                    {/* <!-- Pro Plan --> */}
                    <div className="card active" id="card-2">
                        <h1 className="card-title">Pro</h1>
                        <h2 className="card-price" id="pro-price"> ${plan.proPlan} <span> / {plan.days}</span> </h2>

                        <select id="maus">
                            <option value="500">500 MAUS</option>
                            <option value="100">1000 MAUS</option>
                            <option value="1500">1500 MAUS</option>
                            <option value="2000">2000 MAUS</option>
                            <option value="2500">2500 MAUS</option>
                        </select>
                        <span className="note"> Monthely active users </span>

                        <ul className="card-plan">
                            <li> All starter featured ,Plus : </li>
                            <li> Unlimted projects</li>
                            <li>Unlimted fully customizable themes</li>
                            <li>A dedicated customer Success Manager</li>
                        </ul>
                        <button type="button" className="card-btn"> Choose Plan</button>
                    </div>

                    {/* <!-- Enterpise Card --> */}
                    <div className="card" id="card-3">
                        <h1 className="card-title">Enterprise</h1>
                        <h2 className="card-price"> Let's Talk! </h2>
                        <ul className="card-plan">
                            <li> All pro featured</li>
                            <li> Unlimted MAUs</li>
                            <li> Detected enviroment</li>
                            <li> Enterprise account administration</li>
                            <li> Premium account and services</li>
                        </ul>
                        <button type="button" className="card-btn"> Contact Us</button>
                    </div>
                </div>
            </div></>
    )
}

export default Payment_2