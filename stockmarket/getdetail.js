const detailContent = document.querySelector('.detail-content');
const detailHeadername = document.querySelector('.name');
const detailHeaderpercent = document.querySelector('.percent');
const detailHeadercost = document.querySelector('.cost');

export async function getdetail(name){

    const fetchdetailheader = await fetch("https://stocks3.onrender.com/api/stocks/getstockstatsdata");
    const headerdetailing = await fetchdetailheader.json();
    const headerDetail = headerdetailing.stocksStatsData;
    detailHeadername.textContent=name;
    detailHeaderpercent.textContent=`${headerDetail[0][name].profit}%`;
    detailHeadercost.textContent = `$${headerDetail[0][name].bookValue};`

    if (headerDetail[0][name].profit==0){
        detailHeaderpercent.style.color='red';
    }
    else{
        detailHeaderpercent.style.color='green';
    }

    const fetchdetail = await fetch("https://stocks3.onrender.com/api/stocks/getstocksprofiledata");
    const detailing = await fetchdetail.json();
    const detail = await detailing.stocksProfileData;
    detailContent.textContent=detail[0][name].summary;



}