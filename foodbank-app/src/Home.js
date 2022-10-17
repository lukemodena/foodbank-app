import React,{Component} from "react";

export class Home extends Component{
    render(){
        return(
            <div className='container'>
                <div className='jumbotron mt-5'>
                    <h1 className='display-4'>Welcome to Camden Neighbours Food Reach!</h1>
                    <p className='lead'>At Camden Neighbours Food Reach, we make it easier for local people to support their neighbours living in food poverty through a monthly, door-to-door, targeted food collection for Camden Foodbank.</p>
                    <h2 className='display-6'>The Problem</h2>
                    <p>Since 2019, there has been a 28% increase in the number of households who have needed support from food banks in the UK. The cost of living scandal is locking our Camden neighbours into poverty, forcing them to choose between heating or eating, and jeopardising their human right to be free from hunger. Camden Foodbank is a lifeline for these people.</p>
                    <p>Kindness and community is integral to the Camden neigbours. Local people want to support their neighbours living in food poverty. But they find it logistically difficult to donate food at the right time and place.</p>
                    <h2 className='display-6'>What We Do</h2>
                    <p>We make it easy for local people to support their neighbours through a monthly, targeted food collection. We take on the resource-heavy, time-consuming food organisation tasks</p>
                    <h2 className='display-6'>How We Do It</h2>
                    <ul>
                        <li>Every month, we <strong>identify</strong> which food items Camden Foodbank needs the most.</li>
                        <li>We <strong>reach out</strong> to Camden neighbours that want to support those in food poverty or insecurity. We provide a list of the urgently needed food items, instructions for how to donate, and information about the Trussell Trust’s campaigns for change they can support at the same time.</li>
                        <li>We <strong>collect</strong> targeted food items donated by Camden neighbours network, by offering a food drop off point, door-to-door collections, and an online shopping tool.</li>
                        <li>We <strong>sort</strong>, <strong>weigh</strong>, and <strong>date check</strong> the donated food, which is sent straight to Camden Foodbank, ready to be handed out to people in food poverty the very next day.</li>
                    </ul>
                    <hr className='my-4' />
                </div>
            </div>
        )
    }
}
