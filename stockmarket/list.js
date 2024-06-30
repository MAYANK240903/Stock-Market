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
            myChart.destroy();
            getchart('5y');
        });
    }
}