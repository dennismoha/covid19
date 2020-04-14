/* eslint-disable indent */
const factor = (data) => {
    let getfactor;
    if (data.periodType.trim().toLowerCase() === 'days') {
        getfactor = data.timeToElapse * 1;
    } else if (data.periodType.trim().toLowerCase() === 'weeks') {
        getfactor = (data.timeToElapse * 7);
    } else if (data.periodType.trim().toLowerCase() === 'months') {
        getfactor = (data.timeToElapse * 30);
    } else {
        getfactor = 0;
    }
    return getfactor;
};

const normalCases = (data) => (data.reportedCases * 10) * (2 ** Math.trunc(factor(data) / 3));
const severCases = (data) => (data.reportedCases * 50) * (2 ** Math.trunc(factor(data) / 3));
const hospitalBeds = (data) => (0.35 * data.totalHospitalBeds);
const income = (data) => data.region.avgDailyIncomeInUSD;
const avgPopDailyIncome = (data) => data.region.avgDailyIncomePopulation * income(data);


const covid19ImpactEstimator = (data) => ({
    data,
    impact: {
        currentlyInfected: data.reportedCases * 10,
        infectionsByRequestedTime: normalCases(data),
        severeCasesByRequestedTime: 0.15 * (normalCases(data)),
        hospitalBedsByRequestedTime: Math.trunc((hospitalBeds(data)) - (0.15 * normalCases(data))),
        casesForICUByRequestedTime: Math.trunc(0.05 * Math.trunc(normalCases(data))),
        casesForVentilatorsByRequestedTime: Math.floor(0.02 * (normalCases(data))),
        dollarsInFlight: Math.trunc((normalCases(data) * avgPopDailyIncome(data)) / factor(data))
     },

    severeImpact: {
        currentlyInfected: data.reportedCases * 50,
        infectionsByRequestedTime: severCases(data),
        severeCasesByRequestedTime: 0.15 * severCases(data),
        hospitalBedsByRequestedTime: Math.trunc((hospitalBeds(data)) - (0.15 * severCases(data))),
        casesForICUByRequestedTime: Math.trunc(0.05 * Math.trunc(severCases(data))),
        casesForVentilatorsByRequestedTime: Math.floor(0.02 * severCases(data)),
        dollarsInFlight: Math.trunc((severCases(data) * avgPopDailyIncome(data)) / factor(data))
    }


});

export default covid19ImpactEstimator;
