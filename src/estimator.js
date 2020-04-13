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

const normalCases = (data) => (data.reportedCases * 10) * (2 ** (Math.trunc(factor(data)) / 3));
const severCases = (data) => (data.reportedCases * 50) * (2 ** (Math.trunc(factor(data)) / 3));
// const hospitalBeds = (data) => (0.35 * data.totalHospitalBeds);
// const income = (data) => data.region.avgDailyIncomeInUSD;
// const population = (data) => data.region.avgDailyIncomePopulation;

const covid19ImpactEstimator = (data) => ({
    data,
    impact: {
        currentlyInfected: data.reportedCases * 10,
        infectionsByRequestedTime: (normalCases(data)),
        // infectionsByRequestedTime: (normalCases(data)),
        severeCasesByRequestedTime: (normalCases(data)) * 0.15
        // hospitalBedsByRequestedTime: Math.trunc((hospitalBeds(data))-(0.15 * normalCases(data))),
        // casesForICUByRequestedTime: Math.trunc(0.05 * (normalCases(data))),
        // casesForVentilatorsByRequestedTime: Math.trunc(0.02 * (normalCases(data))),
        // dollarsInFlight: (normalCases(data)) * income * population * (2 ** factor(data))
    },

    severeImpact: {
        currentlyInfected: data.reportedCases * 50,
        infectionsByRequestedTime: (severCases(data))
        // severeCasesByRequestedTime: (severCases(data)) * 0.15
        // hospitalBedsByRequestedTime: Math.trunc((hospitalBeds(data)) -(0.15 * severCases(data))),
        // casesForICUByRequestedTime: Math.trunc(0.5 * (severCases(data))),
        // casesForVentilatorsByRequestedTime: Math.trunc(0.2 * (severCases(data))),
        // dollarsInFlight: (severCases(data)) * income * population * (2 ** factor(data))
    }


});

export default covid19ImpactEstimator;
