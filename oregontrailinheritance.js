const Traveler = class Traveler {
    constructor(nome) {
        this._nome       = nome,
        this._comida     = 1,
        this._nivelSaude = true
    }    

    get nome(){
        return this._nome 
    }

    set nome(newNome){
        this_nome  = newNome
        
    }

    get comida(){
        return this._comida
    }

    set comida(newComida){
       this._comida = newComida          
    }
    get saude(){
        return this._nivelSaude      
    }    

    set saude(newSaude){
        this._nivelSaude = newSaude        
    } 

    hunt(){       
        this.comida += 2                    
    }
    

    eat(){
        if(this._comida > 0){            
            this._comida -= 1
        }else{
            this._nivelSaude = false
        }        
    }
}

const Hunter = class Hunter extends Traveler {
    constructor(nome, nivelSaude){
        super(nome, nivelSaude)

        this._comida = 2
    }

    hunt(){       
        this._comida += 5                    
    }

    eat(){

        if(this._comida >= 2){            
            this._comida -= 2
        }else if(this._comida < 2){
            this._comida = 0 
            this._nivelSaude = false            
        }        
    }

    giveFood(passageiro, numOfFoodUnits){
        
        if(this._comida >= numOfFoodUnits){
            this._comida -= numOfFoodUnits
            passageiro._comida += numOfFoodUnits
        }        
    }    
    
}

const Doctor = class Doctor extends Traveler {
    constructor(nome, comida,nivelSaude){
        super(nome, comida, nivelSaude )
       
    }    

    heal(passageiro){

        if(passageiro._nivelSaude === false){            
            passageiro._nivelSaude = true
        }
    }
}

class Wagon{
    constructor(capacidade=0, listaPassageiros=[]) {
        this._capacidade       = capacidade,
        this._listaPassageiros = listaPassageiros        
    }

    get capacidade(){
        return this._capacidade
    }

    set capacidade(newCapacidade){
        this._capacidade = newCapacidade        
    }

    get listaPassageiros(){
        return this._listaPassageiros
    }

    set listaPassageiros(newListaPassageiros){
        this._listaPassageiros = newListaPassageiros        
    }    

    getAvailableSeatCount(){        
     this.capacidade - Traveler.length     
     return  this.capacidade
    }

    join(passageiro){                                 
        if(this.capacidade > 0){
          this.capacidade -= 1
          return this.listaPassageiros.push(passageiro)
        }else{
            return "Não tem mais espaço."
        }
        
    }    

    totalFood(){

        const result = this.listaPassageiros.reduce((acc, passageiro) => acc + passageiro._comida , 0)        
        return result
        
    }

    shouldQuarantine(){

        const passageiroSaude = this.listaPassageiros.filter((passageiro) => {
            if(passageiro._nivelSaude !== true){
                return this
            }
        })
        if(passageiroSaude.length !== 0){
            return true;            
        }else{
            return false
        }
        
    }
}


// Cria uma carroça que comporta 4 pessoas
let wagon = new Wagon(4);
// Cria cinco viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let drsmith = new Doctor('Dr. Smith');
let sarahunter = new Hunter('Sara');
let maude = new Traveler('Maude');

console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

wagon.join(henrietta);
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter);

wagon.join(maude); // Não tem espaço para ela!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);

sarahunter.hunt(); // pega mais 5 comidas
drsmith.hunt();



console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);

henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan agora está doente (sick)

console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);
drsmith.heal(juan);
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);
sarahunter.giveFood(juan, 4);

sarahunter.eat(); // Ela só tem um, então ela come e fica doente

console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);
