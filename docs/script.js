function calculateHumidity() {
    // Eingabewerte holen
    const tempIn = parseFloat(document.getElementById('tempIn').value);
    const humidityIn = parseFloat(document.getElementById('humidityIn').value);
    const tempOut = parseFloat(document.getElementById('tempOut').value);
    const humidityOut = parseFloat(document.getElementById('humidityOut').value);

    // Sättigungsdampfdruck mit Magnus-Formel
    function getSaturationPressure(T) {
        return 6.112 * Math.exp((17.62 * T) / (243.12 + T));
    }

    // Berechnung der absoluten Luftfeuchtigkeit
    function getAbsoluteHumidity(T, RH) {
        const e_s = getSaturationPressure(T); // Sättigungsdampfdruck in hPa
        const e = (RH / 100) * e_s * 100; // Tatsächlicher Dampfdruck in Pa
        const Mw = 18.016; // molare Masse von Wasserdampf in g/mol
        const R = 8.314; // universelle Gaskonstante in J/(mol·K)
        const T_K = T + 273.15; // Temperatur in Kelvin
        return (e * Mw) / (R * T_K); // absolute Luftfeuchtigkeit in g/m³
    }

    // Berechnung der Feuchte für drinnen und draußen
    const absHumidityIn = getAbsoluteHumidity(tempIn, humidityIn);
    const absHumidityOut = getAbsoluteHumidity(tempOut, humidityOut);

    // Entscheidung ob lüften
    let recommendation = "";
    if (absHumidityOut < absHumidityIn) {
        recommendation = "Es ist sinnvoll zu lüften. Die Luft draußen ist trockener.";
    } else {
        recommendation = "Es ist nicht ratsam zu lüften. Die Luft draußen ist feuchter.";
    }

    // Ergebnis anzeigen
    document.getElementById('result').innerHTML = `
        <p>Absolute Luftfeuchtigkeit drinnen: ${absHumidityIn.toFixed(2)} g/m³</p>
        <p>Absolute Luftfeuchtigkeit draußen: ${absHumidityOut.toFixed(2)} g/m³</p>
        <p><strong>${recommendation}</strong></p>
    `;
}
