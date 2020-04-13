/* eslint-disable indent */
const factor = (data) => {
    let getfactor;
    if (data.periodType.trim().toLowerCase() === 'days') {
        getfactor = 2 * (data.timeToElapse / 3);
    } else if (data.periodType.trim().toLowerCase() === 'weeks') {
        getfactor = 2 * ((data.timeToElapse * 7) / 3);
    } else if (data.periodType.trim().toLowerCase() === 'months') {
        getfactor = 2 * ((data.timeToElapse * 30) / 3);
    } else {
        getfactor = 0;
    }
    return getfactor;
};

const normalCases = (data) => (data.reportedCases * 10) * (2 ** (Math.trunc(factor(data))));
const severCases = (data) => (data.reportedCases * 50) * (2 ** (Math.trunc(factor(data))));
const hospitalBeds = (data) => (0.35 * data.totalHospitalBeds);

const covid19ImpactEstimator = (data) => ({
    data,
    impact: {
        currentlyInfected: data.reportedCases * 10,
        infectionsByRequestedTime: (normalCases(data)),
        severeCasesByRequestedTime: (normalCases(data)) * 0.15,
        hospitalBedsByRequestedTime: Math.trunc((hospitalBeds(data))
         - this.severeCasesByRequestedTime),
        casesForICUByRequestedTime: 0.05 * this.infectionsByRequestedTime,
        casesForVentilatorsByRequestedTime: 2 * this.infectionsByRequestedTime,
        dollarsInFlight: (data.population - this.infectionsByRequestedTime)
         * (data.region.avgDailyIncomePopulation * data.timeToElapse)
    },

    severeImpact: {
        currentlyInfected: data.reportedCases * 50,
        infectionsByRequestedTime: (severCases(data)),
        severeCasesByRequestedTime: (severCases(data)) * 0.15,
        hospitalBedsByRequestedTime: Math.trunc((hospitalBeds(data))
        - this.severeCasesByRequestedTime),
        casesForICUByRequestedTime: 0.05 * this.infectionsByRequestedTime,
        casesForVentilatorsByRequestedTime: 2 * this.infectionsByRequestedTime,
        dollarsInFlight: (data.population - this.infectionsByRequestedTime)
             * (data.region.avgDailyIncomePopulation * data.timeToElapse)
    }

});

export default covid19ImpactEstimator;
