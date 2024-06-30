const stocklist = document.querySelector('.list');
const peakv = document.querySelector('#peak-value');
const minv = document.querySelector('#min-value');
let myChart;
let name;
export async function getchart(year , value){
    name=value;
    const fetchgraph = await fetch("https://stocks3.onrender.com/api/stocks/getstocksdata");
    const fetching = await fetchgraph.json();
    const graph = fetching.stocksData;
    const xValues = graph[0][name][year].timeStamp;
    const yValues = graph[0][name][year].value;
    let max=0;
    let min=1000000000;
    for (let i=0 ; i<xValues.length ; i++){
        if (max<yValues[i]){
            max=yValues[i];
        }
        if(min>yValues[i]){
            min=yValues[i];
        }
        xValues[i]=new Date(xValues[i]*1000).toLocaleDateString();
    }
    peakv.textContent=`Peak Value : $${max.toFixed(2)}`;
    minv.textContent=`Min Value : $${min.toFixed(2)}`;
    
    Chart.register({
      id: 'crosshairPlugin',
      afterEvent: function(chart, args ) {
          const { ctx, chartArea: { left, right, top, bottom } } = chart;
          const event = args.event;
  
          if (event.type !== 'mousemove') {
              const tooltipEl = document.getElementById('chartjs-tooltip');
              const tooltipEl2 = document.getElementById('chartjs-tooltip2');
              tooltipEl.style.opacity = 0;
              tooltipEl2.style.opacity = 0;
              return;
          }
  
          const x = event.x;
          const y = event.y;
  
          if (x < left || x > right || y < top || y > bottom) {
              const tooltipEl = document.getElementById('chartjs-tooltip');
              const tooltipEl2 = document.getElementById('chartjs-tooltip2');
              tooltipEl.style.opacity = 0;
              tooltipEl2.style.opacity = 0;
              return;
          }
  
          // Clear previous drawings
          chart.draw();
  
          // Draw the vertical line
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, top);
          ctx.lineTo(x, bottom);
          ctx.strokeStyle = 'white';
          ctx.lineWidth = 3;
          ctx.stroke();
          ctx.restore();
  
  
          // Find the data point nearest to the cursor
          const xScale = chart.scales['x'];
          const yScale = chart.scales['y'];
          const xValue = xScale.getValueForPixel(x);
  
          let closestPoint = null;
          let closestDistance = Infinity;
          chart.data.datasets[0].data.forEach((value, index) => {
              const distance = Math.abs(xValue - index);
              if (distance < closestDistance) {
                  closestDistance = distance;
                  closestPoint = { index, value };
              }
          });
  
          if (!closestPoint) return;
  
          // Show tooltip for the closest data point
          const tooltipEl = document.getElementById('chartjs-tooltip');
          const tooltipEl2 = document.getElementById('chartjs-tooltip2');
          tooltipEl.style.left = `${event.x}px`;
          tooltipEl2.style.left = `${event.x}px`;
          tooltipEl.style.top = `${event.y+150}px`;
          tooltipEl2.style.top = `${bottom+150}px`;
          tooltipEl.style.opacity = 1;
          tooltipEl2.style.opacity = 1;
          tooltipEl.innerHTML = `${name} : ${closestPoint.value.toFixed(2)}`;
          tooltipEl2.innerHTML = `${chart.data.labels[closestPoint.index]}`;
      }
  });
  
  // Chart.js Initialization
  const ctx = document.getElementById('myChart').getContext('2d');
  myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: xValues,
          datasets: [{
              data: yValues,
              fill: false,
              borderColor: '#32e11a',
              tension: 0.1
          }]
      },
      options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
           },
              tooltip: {
                  enabled: true // Disable the built-in tooltip to implement our own crosshair tooltip
              },
              crosshairPlugin: true
          },
          scales: {
            x: {
              display: false,
              grid: {
                  display: false // Hide x-axis gridlines
              }
          },
          y: {
              display: false,
              grid: {
                  display: false // Hide y-axis gridlines
              }
          }
          }
      }
  } );
  }
  export function destroyChart() {
    if (myChart) {
        myChart.destroy();
        myChart = null; // Clear the reference
    }
}
  
  

  