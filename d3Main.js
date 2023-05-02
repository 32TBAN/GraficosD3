const height = 360;
const margenes = { top: 0, bottom: 80, left: 50, right: 24 };
const width = window.innerWidth - 250 + "px"; //para se ajuste a la pantalla del navegador

const datosGenero = []; //un array que se utiliza para guardar datos por genero

//grafico 01
d3.json("datos03.json").then(function (datos) {
  const color = [
    "red",
    "blue",
    "yellow",
    "#F7BB80",
    "#95AFCA",
    "#9BC795",
    "#CFAFC7",
    "#F4DF92",
    "#ED9A9B",
  ]; //vector de colores

  datos.forEach(function (d) {
    d.Datos.forEach(function (item) {
      datosGenero.push({
        genero: d.Nombre,
        valor: item.Valor,
        agno: item.Agno,
      });
    });
  }); // se estan llenado los datos necesarios en el array datosGenro

  const datevalues = datosGenero.reduce((acumulador, dato) => {
    const indice = acumulador.findIndex((agno) => agno[0] === dato.agno);
    if (indice !== -1) {
      acumulador[indice][1][dato.genero] = dato.valor;
    } else {
      acumulador.push([dato.agno, { [dato.genero]: dato.valor }]);
    }

    return acumulador;
  }, []); //se hace un nuevo array ordedandolo por fecha y los valores de hombre y mujer

  //console.log(datosGenero)
  const contenedor1 = d3
    .select("#grafico01")
    .style("margin", "0 auto")
    .style("width", width )
    .attr("height", height)
    .style("border", "1px solid blue");

  let colorAzar = Math.floor(Math.random() * color.length); //escoje un color al azar

  for (let i = 0; i < datevalues.length; i++) {
    //for para simular una animacion
    const chart = contenedor1.append("g");

    //escalas en x
    var xScale = d3
      .scaleLinear()
      .domain([0, d3.max(datosGenero, (d) => d.valor)])
      .range([0, window.innerWidth - 350]);

    //escala en y
    var yScale = d3
      .scaleBand()
      .domain(datosGenero.map((d) => d.genero))
      .rangeRound([height - 10, 10])
      .padding(0.1);

    chart
      .append("g")
      .call(d3.axisBottom(xScale))
      .attr(
        "transform",
        "translate(" + (margenes.left + 3) + "," + (margenes.top + 10) + ")"
      )
      .attr("color", "green"); //se dibuja los datos en el eje x

    chart
      .append("g")
      .attr(
        "transform",
        "translate(" + margenes.left + "," + (margenes.bottom - 80) + ")"
      )
      .call(d3.axisLeft(yScale)); //se dibuja los datos en el eje y

    const bars = contenedor1
      .selectAll(".bar")
      .data(datosGenero, (d) => d.genero); //se crea las barras por genero

    bars
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d3.max(datosGenero, (d) => d.valor) + 5)
      .attr("y", (d) => yScale(d.genero))
      .attr("width", 0)
      .attr("height", yScale.bandwidth() - 10)
      .transition()
      .duration(5000)
      .attr("width", (d) => xScale(d.valor))
      .style("fill", `${color[colorAzar]}`); // se crean las barras y se hace una transcion para simular una animacion
  }
});

//Grafica 02
d3.json("datos02.json").then(function (datos) {
  const datosArray = Object.values(datos);
  const heigth = 470;
  //console.log(datosArray)
  //contenedor donde se dibuja la grafica
  const contenedor = d3
    .select("#grafico02")
    .style("margin", "0 auto")
    .style("width", width)
    .attr("height", heigth + margenes.top + margenes.bottom)
    .style("border", "1px solid blue");

  //escalas en x
  const xScale = d3
    .scaleBand()
    .domain(
      datosArray.map(function (d) {
        return d.Periodo + " " + d.Agno;
      })
    )
    .rangeRound([0, window.innerWidth - 260])
    .padding(0.1);
  //escala en y
  const yScale = d3
    .scaleLinear()
    .domain([-279999, d3.max(datosArray, (d) => d.Valor)])
    .range([heigth, 10]);
  //Axis para respresentar los datos en los ejes
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3
    .axisLeft(yScale)
    .tickValues([-200000, 0, 200000, 400000, 600000, 800000]);

  contenedor
    .append("g")
    .attr(
      "transform",
      "translate(" + margenes.left + "," + (heigth + margenes.top) + ")"
    )
    .call(xAxis)
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");

  contenedor
    .append("g")
    .attr("transform", "translate(" + margenes.left + "," + margenes.top + ")")
    .call(yAxis);

  contenedor
    .append("line")
    .attr("x1", margenes.left)
    .attr("y1", yScale(0))
    .attr("x2", window.innerWidth - margenes.right)
    .attr("y2", yScale(0))
    .style("stroke", "black")
    .style("stroke-width", "2px");
  var z = d3.scaleSequential(d3.interpolateBlues).domain([-0.5 * 17, 1.5 * 17]);
  var azules = [
    [0.14444968081850715, 0.33264088991857754, 1],
    [0.15767272595619705, 0.3174034898040671, 1],
    [0.1620360950110731, 0.3268178901177491, 1],
    [0.18938058745303443, 0.33513409403119154, 1],
    [0.14625732156689492, 0.25098922903654436, 1],
    [0.16391915269587726, 0.264405232186786, 1],
    [0.17367869215522716, 0.31002467975649645, 1],
    [0.13635361012614464, 0.3454532308893417, 1],
    [0.13188031806881895, 1.9282386228873256, 1],
    [0.1901702009729436, 3.38068558126773, 1],
    [0.14724887258189936, 1.0248936505352242, 1],
    [0.13609174853074824, 0.3461264471351334, 1],
    [0.13158926117770312, 0.30265994968120835, 1],
    [0.10201588576567495, 0.2913249386531997, 1],
    [0.15525619275985528, 0.3369160090111638, 1],
    [0.1655115677888036, 0.34294893330384224, 1],
    [0.13226722536627092, 0.31634217208868953, 1],
    [0.20107147799259598, 0.39816890343581146, 1],
  ];

  const barras = contenedor
    .selectAll("rect")
    .data(datosArray)
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return xScale(d.Periodo + " " + d.Agno) + margenes.left;
    })
    .attr("y", (d) => (d.Valor < 0 ? yScale(0) : yScale(d.Valor)))
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) {
      if (d.Valor >= 0) {
        return yScale(0) - yScale(d.Valor);
      } else {
        return yScale(d.Valor) - yScale(0);
      }
    })
    .style("fill", (azules, i) => z(i));

  function repetir() {
    barras
      .transition()
      .duration(1000)
      .attr("width", xScale.bandwidth())
      .attr("height", function (d) {
        if (d.Valor >= 0) {
          return yScale(0) - yScale(d.Valor);
        } else {
          return yScale(d.Valor) - yScale(0);
        }
      })
      .transition()
      .duration(1000)
      .attr("width", xScale.bandwidth() - 23)
      .attr("height", function (d) {
        if (d.Valor >= 0) {
          return yScale(0) - yScale(d.Valor);
        } else {
          return 100;
        }
      })
      .on("end", repetir);
  }

  repetir();
});

// graicp 03
d3.json("datos01.json").then(function (datos) {
  const datosArray = Object.values(datos);
  const margenes = { top: 24, bottom: 80, left: 40, right: 24 };
  //console.log(datosArray)
  //contenedor donde se dibuja la grafica
  const contenedor = d3
    .select("#grafico03")
    .style("margin", "0 auto")
    .style("width", width)
    .attr("height", height + margenes.top + margenes.bottom)
    .style("border", "1px solid blue");

  //escalas en x
  const xScale = d3
    .scaleBand()
    .domain(
      datosArray.map(function (d) {
        return d.Periodo + " " + d.Agno;
      })
    )
    .rangeRound([0, window.innerWidth - 400])
    .padding(0.1);
  //escala en y
  const yScale = d3.scaleLinear().domain([40, 49]).range([height, 0]);
  //Axis para respresentar los datos en los ejes
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  contenedor
    .append("g")
    .attr(
      "transform",
      "translate(" + margenes.left + "," + (height + margenes.top) + ")"
    )
    .call(xAxis)
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");

  contenedor
    .append("g")
    .attr("transform", "translate(" + margenes.left + "," + margenes.top + ")")
    .call(yAxis);

  const linea = d3
    .line()
    .x((d) => xScale(d.Periodo + " " + d.Agno))
    .y((d) => yScale(d.Valor));

  contenedor
    .append("path")
    .datum(datosArray)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 3)
    .attr("d", linea)
    .attr("transform", "translate(" + margenes.left + "," + margenes.top + ")");

  contenedor
    .append("g")
    .selectAll("circle")
    .data(datosArray)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return xScale(d.Periodo + " " + d.Agno) + xScale.bandwidth() / 2;
    })
    .attr("cy", function (d) {
      return yScale(d.Valor);
    })
    .attr("r", 5)
    .attr("fill", "blue")
    .attr("stroke", "blue")
    .attr("transform", `translate(${margenes.left - 10},${margenes.top})`)
    .on("mouseover", function (d) {
      var point = d3.select(this);
      contenedor
        .append("text")
        .attr("class", "data-label")
        .attr("x", +point.attr("cx") + 10)
        .attr("y", +point.attr("cy") - 10)
        .text(
          " " +
            point.data()[0].Agno +
            " - " +
            point.data()[0].Periodo +
            " - " +
            point.data()[0].Valor
        )
        .style("fill", "#04D9D9");
    })
    .on("mouseout", function () {
      contenedor.select(".data-label").remove();
    });
});
//grafico 04

d3.json("Emigrantes.json").then(function (datos) {
  const datosArray = Object.values(datos);
  const margenes = { top: 24, bottom: 80, left: 40, right: 24 };
  //console.log(datosArray)
  //contenedor donde se dibuja la grafica
  const contenedor = d3
    .select("#grafico04")
    .style("margin", "0 auto")
    .style("width", width)
    .attr("height", height + margenes.top + margenes.bottom)
    .style("border", "1px solid blue");

  //escalas en x
  const xScale = d3
    .scaleBand()
    .domain(
      datosArray.map(function (d) {
        return d.Periodo + " " + d.Agno;
      })
    )
    .rangeRound([0, window.innerWidth - 400])
    .padding(0.1);
  //escala en y
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(datosArray.map((d) => d.Valor))])
    .range([height, 0]);
  //Axis para respresentar los datos en los ejes
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  contenedor
    .append("g")
    .attr(
      "transform",
      "translate(" + margenes.left + "," + (height + margenes.top) + ")"
    )
    .call(xAxis)
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");

  contenedor
    .append("g")
    .attr("transform", "translate(" + margenes.left + "," + margenes.top + ")")
    .call(yAxis);

  const linea = d3
    .line()
    .x((d) => xScale(d.Periodo + " " + d.Agno))
    .y((d) => yScale(d.Valor));

  contenedor
    .append("path")
    .datum(datosArray)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 3)
    .attr("d", linea)
    .attr("transform", "translate(" + margenes.left + "," + margenes.top + ")");

  const puntos = contenedor
    .append("g")
    .selectAll("circle")
    .data(datosArray)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return xScale(d.Periodo + " " + d.Agno) + xScale.bandwidth() / 2;
    })
    .attr("cy", function (d) {
      return yScale(d.Valor);
    })
    .attr("r", 5)
    .attr("fill", "blue")
    .attr("stroke", "blue")
    .attr("transform", `translate(${margenes.left - 14},${margenes.top})`)
    .on("mouseover", function (d) {
      var point = d3.select(this);
      contenedor
        .append("text")
        .attr("class", "data-label")
        .attr("x", +point.attr("cx") + 10)
        .attr("y", +point.attr("cy") + 60)
        .text(
          " " +
            point.data()[0].Agno +
            " - " +
            point.data()[0].Periodo +
            " - " +
            point.data()[0].Valor
        )
        .style("fill", "#04D9D9");
    })
    .on("mouseout", function () {
      contenedor.select(".data-label").remove();
    });

  d3.json("Inmigrantes.json").then(function (datos) {
    const datosArray2 = Object.values(datos);

    const linea2 = d3
      .line()
      .x((d) => xScale(d.Periodo + " " + d.Agno))
      .y((d) => yScale(d.Valor));

    contenedor
      .append("path")
      .datum(datosArray2)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 3)
      .attr("d", linea2)
      .attr(
        "transform",
        "translate(" + margenes.left + "," + margenes.top + ")"
      );

    contenedor
      .append("g")
      .selectAll("circle")
      .data(datosArray2)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return xScale(d.Periodo + " " + d.Agno) + xScale.bandwidth() / 2;
      })
      .attr("cy", function (d) {
        return yScale(d.Valor);
      })
      .attr("r", 5)
      .attr("fill", "green")
      .attr("stroke", "green")
      .attr("transform", `translate(${margenes.left - 14},${margenes.top})`)
      .on("mouseover", function (d) {
        var point = d3.select(this);
        contenedor
          .append("text")
          .attr("class", "data-label")
          .attr("x", +point.attr("cx") + 10)
          .attr("y", +point.attr("cy") + 50)
          .text(
            " " +
              point.data()[0].Agno +
              " - " +
              point.data()[0].Periodo +
              " - " +
              point.data()[0].Valor
          )
          .style("fill", "#04D9D9");
      })
      .on("mouseout", function () {
        contenedor.select(".data-label").remove();
      });
  });
});
