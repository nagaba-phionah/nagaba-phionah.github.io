const covid19ImpactEstimator = (data) => {
	
	/*data = {
		region: {
			name: "Africa",
			avgAge: 19.7,
			avgDailyIncomeInUSD: 5,
			avgDailyIncomePopulation: 0.71
		},
		periodType: "days",
		timeToElapse: 58,
		reportedCases: 674,
		population: 66622705,
		totalHospitalBeds: 1380614
	}; */
	 
	let MyOutput = { 
		data: data,			// the input data I received
		impact: {},			// my best case estimation
		severeImpact: {}  // my severe case estimation 
	} 
	const requestedTimeInDays = nomalizeTimeIntoDays(MyOutput.data.periodType, MyOutput.data.periodType.timeToElapse);
	MyOutput.impact.currentlyInfected = MyOutput.data.reportedCases*10;
	MyOutput.impact.infectionsByRequestedTime = MyOutput.impact.currentlyInfected*(2^(requestedTimeInDays/3));
	MyOutput.impact.severeCasesByRequestedTime = 0.15*MyOutput.impact.infectionsByRequestedTime;
	MyOutput.impact.hospitalBedsByRequestedTime = (0.35*MyOutput.data.totalHospitalBeds)-MyOutput.impact.severeCasesByRequestedTime;    
	MyOutput.impact.casesForICUByRequestedTime = 0.05*MyOutput.impact.infectionsByRequestedTime;
	MyOutput.impact.casesForVentilatorsByRequestedTime = 0.02*MyOutput.impact.infectionsByRequestedTime;
	MyOutput.impact.dolarsInFlight = (MyOutput.data.region.avgDailyIncomePopulation*MyOutput.data.population)*(MyOutput.data.region.avgDailyIncomeInUSD*MyOutput.impact.infectionsByRequestedTime)*requestedTimeInDays;
	//---------------------------
	MyOutput.severeImpact.currentlyInfected = MyOutput.data.reportedCases*50;
	MyOutput.severeImpact.infectionsByRequestedTime = MyOutput.severeImpact.currentlyInfected*(2^(requestedTimeInDays/3));         
	MyOutput.severeImpact.severeCasesByRequestedTime = 0.15*MyOutput.severeImpact.infectionsByRequestedTime; 
	MyOutput.severeImpact.hospitalBedsByRequestedTime = (0.35*MyOutput.data.totalHospitalBeds)-MyOutput.severeImpact.severeCasesByRequestedTime;    
	MyOutput.severeImpact.casesForICUByRequestedTime = 0.05*MyOutput.severeImpact.infectionsByRequestedTime;
	MyOutput.severeImpact.casesForVentilatorsByRequestedTime = 0.02*MyOutput.severeImpact.infectionsByRequestedTime;
	MyOutput.severeImpact.dolarsInFlight = (MyOutput.data.region.avgDailyIncomePopulation*MyOutput.data.population)*(MyOutput.data.region.avgDailyIncomeInUSD*MyOutput.severeImpact.infectionsByRequestedTime)*requestedTimeInDays;      
	return MyOutput; 
};

const nomalizeTimeIntoDays = (periodType, timeToElapse) => {
	switch (periodType){
		case "days":
			return timeToElapse; 
		case "weeks":
			return timeToElapse*7;
		case "months":
			return timeToElapse*30;
		case "years":
			return timeToElapse*365;
		default:
			return 1; 
	}
}
 


export default covid19ImpactEstimator;








