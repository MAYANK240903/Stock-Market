import { getchart , destroyChart } from "./getchart.js";
import { getdetail } from "./getdetail.js";



const month1 = document.querySelector('#month-1');
const month3 = document.querySelector('#month-3');
const year1 = document.querySelector('#year-1');
const year5 = document.querySelector('#year-5');


const Stocks = ['AAPL' , 'GOOGL' , 'MSFT' , 'AMZN' , 'PYPL' , 'TSLA' , 'JPM' , 'NVDA' , 'NFLX' , 'DIS'];


let name='AAPL';
let myChart;

getchart('5y' , name);



month1.addEventListener('click',()=>{
  destroyChart();
  getchart('1mo' , name);
});

month3.addEventListener('click',()=>{
  destroyChart();
  getchart('3mo' , name);
});
year1.addEventListener('click',()=>{
  destroyChart();
  getchart('1y' , name);
});
year5.addEventListener('click',()=>{
  destroyChart();
  getchart('5y' , name);
});




liststock(Stocks);
getdetail(name);
const stocklist = document.querySelector('.list');
export async function liststock(Stocks){
    const fetchdetailheader = await fetch("https://stocks3.onrender.com/api/stocks/getstockstatsdata");
    const headerdetailing = await fetchdetailheader.json();
    const headerDetail = headerdetailing.stocksStatsData;
    for (let i=0 ; i<Stocks.length ; i++){
        const div = document.createElement('div');
        div.className='list-div';


        const btn = document.createElement('button');
        btn.className="btn";
        btn.style.backgroundColor='#010166;';
        btn.textContent=Stocks[i];
        div.appendChild(btn);

        const span = document.createElement('span');
        span.className='list-span';
        span.textContent=`$${headerDetail[0][Stocks[i]].bookValue}`;
        div.appendChild(span);


        const profitlist = document.createElement('span');
        profitlist.className='list-span';
        profitlist.textContent=`${headerDetail[0][Stocks[i]].profit.toFixed(2)}%`;
        div.appendChild(profitlist);

        if (headerDetail[0][Stocks[i]].profit==0){
            profitlist.style.color='red';
        }
        else{
            profitlist.style.color='green';
        }

        stocklist.appendChild(div);





        btn.addEventListener('click' , ()=>{
            name=Stocks[i];
            getdetail(Stocks[i]);
            destroyChart();
            name=Stocks[i];
            getchart('5y',Stocks[i]);
        });
    }
}