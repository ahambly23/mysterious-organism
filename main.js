// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// factory function pAequorFactory()
const pAequorFactory = (number, array) => {
  let object = {
    specimenNum: number,
    dna: array,
    mutate() {
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      const currentBase = this.dna[randomIndex];
      const dnaBases = ["A", "T", "C", "G"];
      const possibleBases = dnaBases.filter((base) => base !== currentBase);
      const newBase =
        possibleBases[Math.floor(Math.random() * possibleBases.length)];
      this.dna[randomIndex] = newBase;
      return this.dna;
    },
    compareDNA(obj) {
      let identicalBases = 0;
      let totalBases = this.dna.length;
      for (let x = 0; x < totalBases; x++) {
        if (this.dna[x] === obj.dna[x]) {
          identicalBases++;
        }
      }
      let percentage = 0;
      if (totalBases !== 0) {
        percentage = (identicalBases / totalBases) * 100;
        console.log(
          `Specimen #${this.specimenNum} and Specimen #${obj.specimenNum} have ${percentage}% in common.`
        );
      }
    },
    willLikelySurvive() {
      let goodDNA = this.dna.filter((base) => {
        return base === "C" || base === "G";
      });
      if ((goodDNA.length / this.dna.length) * 100 >= 60) {
        return true;
      } else {
        return false;
      }
    },
  };
  return object;
};

const instances = 30;
let survivingPAequor = [];

while (survivingPAequor.length < instances) {
  let newInstance = pAequorFactory(survivingPAequor.length + 1, mockUpStrand());
  if (newInstance.willLikelySurvive()) {
    survivingPAequor.push(newInstance);
  }
}

console.log(survivingPAequor)
