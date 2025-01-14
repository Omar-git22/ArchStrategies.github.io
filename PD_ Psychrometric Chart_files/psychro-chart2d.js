!function () {
    const tempUnit = " \u00B0C";
    const speedUnit = " m/s";
    var e, t = {
        Chart: {
            dryBulbMin: 0,
            dryBulbMax: 50,
            absHumidityMax: 35,
            atmPressure: 101.365,
            legendAlign: pd.Align.RIGHT,
            verticalAxis: 0,
            detailMode: !1,
            gridVerticalAxis: -1,
            gridFadeCells: !1,
            gridHighRes: !1,
            gridCellGap: Math.round(pd.mapAndConstrainTo(pdDOM.getClientWidth(), 0, 1500, 1, 4)),
            showDryBulb: !0,
            showAbsHumidity: !0,
            showRelHumidity: !0,
            showWetBulb: !1,
            showVapPressure: !1,
            showAirVolume: !1,
            showEnthalpy: !1,
            showComfortGrid: !1,
            showIndicator: !0,
            lineHilite: 0,
            infoOverlay: 0,
            dataOverlay: 0,
            processOverlay: 0,
            paddingTop: 40,
            paddingRight: 40,
            paddingBottom: 40,
            paddingLeft: 5
        },
        DateTimeRange: {
            fromDay: 0,
            toDay: 364,
            fromTime: 0,
            toTime: 0,
            startDayOfWeek: 0,
            dayFilter: 127,
            showSelector: !1
        },
        Comfort: {
            dryBulbTemperature: 23,
            relativeHumidity: 40,
            clothingLevel: 1,
            metabolicRate: 1,
            externalWork: 0,
            meanRadiantTemperature: 20,
            airVelocity: .2,
            meanOutdoorTemperature: 19,
            thermalMassEfficacy: .5,
            solarGainsEfficacy: .25,
            internalHeatGains: .25,
            solarExposure: 0,
            trackTemperature: !1,
            predictCLO: !1,
            percentageInComfort: 0,
            listOfComfortPoints: []
        },
        DisplayUnits: {
            temperature: "°C",
            humidity: "g/kg",
            pressure: "kPa",
            volume: "m3/kg",
            enthalpy: "kJ/kg",
            velocity: "m/s"
        },
        updateDataFromModel: function () {
        },
        readAppData: function (e) {
            if ("Chart" in e) {
                var t = e.Chart;
                "dryBulbMin" in t && (this.Chart.dryBulbMin = pd.constrainTo(pd.toNumber(t.dryBulbMin, 5), -50, 100)),
                    "dryBulbMax" in t && (this.Chart.dryBulbMax = pd.constrainTo(pd.toNumber(t.dryBulbMax, 5), -50, 100),
                        this.Chart.dryBulbMin = Math.min(this.Chart.dryBulbMin, this.Chart.dryBulbMax - 1)),
                    "absHumidityMax" in t && (this.Chart.absHumidityMax = pd.constrainTo(pd.toNumber(t.absHumidityMax, 35), 0, 50)),
                    "atmPressure" in t && (this.Chart.atmPressure = pd.constrainTo(pd.toNumber(t.atmPressure, 101.365), 51.365, 131.366)),
                    "legendAlign" in t && (this.Chart.legendAlign = pd.constrainTo(pd.toInteger(t.legendAlign, pd.Align.RIGHT), 0, 32)),
                    "verticalAxis" in t && (this.Chart.verticalAxis = pd.constrainTo(pd.toInteger(t.verticalAxis, 0), 0, 1)),
                    "detailMode" in t && (this.Chart.detailMode = "true" === String(t.detailMode)),
                    "gridVerticalAxis" in t && (this.Chart.gridVerticalAxis = pd.constrainTo(pd.toInteger(t.gridVerticalAxis, 0), -1, 1)),
                    "gridFadeCells" in t && (this.Chart.gridFadeCells = "true" === String(t.gridFadeCells)),
                    "gridHighRes" in t && (this.Chart.gridHighRes = "true" === String(t.gridHighRes)),
                    "gridCellGap" in t && (this.Chart.gridCellGap = pd.constrainTo(pd.toNumber(t.gridCellGap, 1), 0, 10)),
                    "showDryBulb" in t && (this.Chart.showDryBulb = "true" === String(t.showDryBulb)),
                    "showAbsHumidity" in t && (this.Chart.showAbsHumidity = "true" === String(t.showAbsHumidity)),
                    "showRelHumidity" in t && (this.Chart.showRelHumidity = "true" === String(t.showRelHumidity)),
                    "showWetBulb" in t && (this.Chart.showWetBulb = "true" === String(t.showWetBulb)),
                    "showVapPressure" in t && (this.Chart.showVapPressure = "true" === String(t.showVapPressure)),
                    "showAirVolume" in t && (this.Chart.showAirVolume = "true" === String(t.showAirVolume)),
                    "showEnthalpy" in t && (this.Chart.showEnthalpy = "true" === String(t.showEnthalpy)),
                    "showComfortGrid" in t && (this.Chart.showComfortGrid = "true" === String(t.showComfortGrid)),
                    "showIndicator" in t && (this.Chart.showIndicator = "true" === String(t.showIndicator)),
                    "lineHilite" in t && (this.Chart.lineHilite = pd.constrainTo(pd.toInteger(t.lineHilite, 0), -5, 100)),
                    "infoOverlay" in t && (this.Chart.infoOverlay = pd.constrainTo(pd.toInteger(t.infoOverlay, 0), 0, 10)),
                    "dataOverlay" in t && (this.Chart.dataOverlay = pd.constrainTo(pd.toInteger(t.dataOverlay, 0), 0, 10)),
                    "processOverlay" in t && (this.Chart.processOverlay = pd.constrainTo(pd.toInteger(t.processOverlay, 0), 0, 255)),
                    "paddingTop" in t && (this.Chart.paddingTop = pd.constrainTo(pd.toInteger(t.paddingTop, this.Chart.paddingTop), 0, 100)),
                    "paddingRight" in t && (this.Chart.paddingRight = pd.constrainTo(pd.toInteger(t.paddingRight, this.Chart.paddingRight), 0, 100)),
                    "paddingBottom" in t && (this.Chart.paddingBottom = pd.constrainTo(pd.toInteger(t.paddingBottom, this.Chart.paddingBottom), 0, 100)),
                    "paddingLeft" in t && (this.Chart.paddingLeft = pd.constrainTo(pd.toInteger(t.paddingLeft, this.Chart.paddingLeft), 0, 100));
            }
            if ("DateTimeRange" in e) {
                var a = e.DateTimeRange;
                "fromDay" in a && (this.DateTimeRange.fromDay = pd.constrainTo(pd.toInteger(a.fromDay, this.DateTimeRange.fromDay), 0, 365)),
                    "toDay" in a && (this.DateTimeRange.toDay = pd.constrainTo(pd.toInteger(a.toDay, this.DateTimeRange.toDay), 0, 365)),
                    "fromTime" in a && (this.DateTimeRange.fromTime = pd.constrainTo(pd.toNumber(a.fromTime, this.DateTimeRange.fromTime), 0, 24)),
                    "toTime" in a && (this.DateTimeRange.toTime = pd.constrainTo(pd.toNumber(a.toTime, this.DateTimeRange.toTime), 0, 24)),
                    "startDayOfWeek" in a && (this.DateTimeRange.startDayOfWeek = pd.constrainTo(pd.toInteger(a.startDayOfWeek, this.DateTimeRange.startDayOfWeek), 0, 6)),
                    "dayFilter" in a && (this.DateTimeRange.dayFilter = pd.constrainTo(pd.toInteger(a.dayFilter, this.DateTimeRange.dayFilter), 0, 127)),
                    "showSelector" in a && (this.DateTimeRange.showSelector = "true" === String(a.showSelector));
            }
            if ("Comfort" in e) {
                var r = e.Comfort;
                "dryBulbTemperature" in r && (this.Comfort.dryBulbTemperature = pd.constrainTo(pd.toNumber(r.dryBulbTemperature, this.Comfort.dryBulbTemperature), -50, 100)),
                    "relativeHumidity" in r && (this.Comfort.relativeHumidity = pd.constrainTo(pd.toNumber(r.relativeHumidity, this.Comfort.relativeHumidity), 0, 100)),
                    "clothingLevel" in r && (this.Comfort.clothingLevel = pd.constrainTo(pd.toNumber(r.clothingLevel, this.Comfort.clothingLevel), 0, 4)),
                    "metabolicRate" in r && (this.Comfort.metabolicRate = pd.constrainTo(pd.toNumber(r.metabolicRate, this.Comfort.metabolicRate), 0, 4)),
                    "externalWork" in r && (this.Comfort.externalWork = pd.constrainTo(pd.toNumber(r.externalWork, this.Comfort.externalWork), 0, 4)),
                    "meanRadiantTemperature" in r && (this.Comfort.meanRadiantTemperature = pd.constrainTo(pd.toNumber(r.meanRadiantTemperature, this.Comfort.meanRadiantTemperature), -50, 100)),
                    "airVelocity" in r && (this.Comfort.airVelocity = pd.constrainTo(pd.toNumber(r.airVelocity, this.Comfort.airVelocity), 0, 2)),
                    "meanOutdoorTemperature" in r && (this.Comfort.meanOutdoorTemperature = pd.constrainTo(pd.toNumber(r.meanOutdoorTemperature, this.Comfort.meanOutdoorTemperature), -50, 100)),
                    "thermalMassEfficacy" in r && (this.Comfort.thermalMassEfficacy = pd.constrainTo(pd.toNumber(r.thermalMassEfficacy, this.Comfort.thermalMassEfficacy), 0, 1)),
                    "solarGainsEfficacy" in r && (this.Comfort.solarGainsEfficacy = pd.constrainTo(pd.toNumber(r.solarGainsEfficacy, this.Comfort.solarGainsEfficacy), 0, 1)),
                    "internalHeatGains" in r && (this.Comfort.internalHeatGains = pd.constrainTo(pd.toNumber(r.internalHeatGains, this.Comfort.internalHeatGains), 0, 1)),
                    "solarExposure" in r && (this.Comfort.solarExposure = pd.constrainTo(pd.toNumber(r.solarExposure, this.Comfort.solarExposure), 0, 1)),
                    "trackTemperature" in r && (this.Comfort.trackTemperature = "true" === String(r.trackTemperature)),
                    "predictCLO" in r && (this.Comfort.predictCLO = "true" === String(r.predictCLO)),
                    "percentageInComfort" in r && (this.Comfort.percentageInComfort = pd.constrainTo(pd.toNumber(r.percentageInComfort, this.Comfort.percentageInComfort), 0, 100)),
                    "listOfComfortPoints" in r && (this.Comfort.listOfComfortPoints = []);
            }
            if ("DisplayUnits" in e) {
                var i = e.DisplayUnits;
                "temperature" in i && (this.DisplayUnits.temperature = i.temperature.toString()),
                    "humidity" in i && (this.DisplayUnits.humidity = i.humidity.toString()), "pressure" in i && (this.DisplayUnits.pressure = i.pressure.toString()),
                    "volume" in i && (this.DisplayUnits.volume = i.volume.toString()), "enthalpy" in i && (this.DisplayUnits.enthalpy = i.enthalpy.toString()),
                    "velocity" in i && (this.DisplayUnits.velocity = i.velocity.toString());
            }
        },
        readFromLocalStorage: function () {
            var e = pdDOM.getLocalStorageItem("appConfig");
            if (e) {
                var t = JSON.parse(e);
                this.readAppData(t);
            }
        },
        writeToLocalStorage: function () {
            this.updateDataFromModel(), pdDOM.setLocalStorageItem("appConfig", JSON.stringify(this));
        },
        clearLocalStorage: function () {
            this.updateDataFromModel(), pdDOM.removeLocalStorageItems(["showStartMenu", "appConfig"]);
        }
    };
    t.readFromLocalStorage(), (e = pdDOM.getUrlParams().psychroData) && e.length && t.readAppData(pdDOM.uriToJSON(e));
    var a = null;

    function r() {
        var e = document.getElementById("jsoneditor");
        (a = e.contentWindow.jsonEditor) && (a.setName("App (psychro-chart2d)"), a.setSchema({
            title: "Chart Schema",
            $schema: "http://json-schema.org/schema#",
            id: "http://performativedesign.com/psychro-chart2d",
            type: "object",
            properties: {
                Chart: {
                    type: "object",
                    description: "Defines chart and graphs settings.",
                    properties: {
                        dryBulbMin: {
                            description: "The minimum chart temperature in the X-axis (degC).",
                            type: "number",
                            minimum: -50,
                            maximum: 100
                        },
                        dryBulbMax: {
                            description: "The maximum chart temperature in the X-axis (degC).",
                            type: "number",
                            minimum: -50,
                            maximum: 100
                        },
                        absHumidityMax: {
                            description: "The maximum chart humidity ratio in the Y-axis (g/kg).",
                            type: "number",
                            minimum: 0,
                            maximum: 50
                        },
                        atmPressure: {
                            description: "The atmospheric pressure to calculate the chart for (kPa).",
                            type: "number",
                            minimum: 51.365,
                            maximum: 131.366
                        },
                        legendAlign: {
                            description: "The alignment of the legend, defaults to pd.Align.RIGHT.",
                            type: "integer",
                            minimum: 0,
                            maximum: 32
                        },
                        verticalAxis: {
                            description: "Whether to use absolute or relative humidity as the vertical axis.",
                            type: "integer",
                            minimum: 0,
                            maximum: 1
                        },
                        detailMode: {
                            description: "Whether or not to use high-detail relative indicator movements.",
                            type: "boolean"
                        },
                        gridVerticalAxis: {
                            description: "Whether to use absolute or relative humidity for binning Y-axis grid data.",
                            type: "integer",
                            minimum: -1,
                            maximum: 1
                        },
                        gridFadeCells: {
                            description: "Weight the opacity of each cell by the number of hourly values.",
                            type: "boolean"
                        },
                        gridHighRes: {
                            description: "Use a higer resolution data overlay grid, 2% RH per cell rather than 5% RH.",
                            type: "boolean"
                        },
                        gridCellGap: {
                            description: "The gap between cells in the grid, in pixels.",
                            type: "number",
                            minimum: 0,
                            maximum: 10
                        },
                        showDryBulb: {
                            description: "Whether or not to show lines of dry-bulb temperature in the chart.",
                            type: "boolean"
                        },
                        showAbsHumidity: {
                            description: "Whether or not to show lines of absolute humidity in the chart.",
                            type: "boolean"
                        },
                        showRelHumidity: {
                            description: "Whether or not to show lines of relative humidity in the chart.",
                            type: "boolean"
                        },
                        showWetBulb: {
                            description: " Whether or not to show lines of wet-bulb temperature in the chart.",
                            type: "boolean"
                        },
                        showVapPressure: {
                            description: "Whether or not to show lines of vapour pressure in the chart.",
                            type: "boolean"
                        },
                        showAirVolume: {
                            description: "Whether or not to show lines of specific air volume in the chart.",
                            type: "boolean"
                        },
                        showEnthalpy: {
                            description: "Whether or not to show lines of enthalpy in the chart.",
                            type: "boolean"
                        },
                        showComfortGrid: {
                            description: "Whether or not to show comfort grid data mapped over the chart.",
                            type: "boolean"
                        },
                        showIndicator: {
                            description: "Whether or not to show the position indicator.",
                            type: "boolean"
                        },
                        lineHilite: {
                            description: "The metric line(s) to highlight in the chart.",
                            type: "integer",
                            minimum: -5,
                            maximum: 100
                        },
                        infoOverlay: {
                            description: "The type of comfort information to overlay on the chart.",
                            type: "integer",
                            minimum: 0,
                            maximum: 10
                        },
                        dataOverlay: {
                            description: "The type of weather or CSV data to overlay on the chart.",
                            type: "integer",
                            minimum: 0,
                            maximum: 10
                        },
                        processOverlay: {
                            description: "The type of psychrometric processes to overlay on the chart.",
                            type: "integer",
                            minimum: 0,
                            maximum: 255
                        },
                        paddingTop: {
                            description: "The padding at the top of the chart.",
                            type: "integer",
                            minimum: 0,
                            maximum: 100
                        },
                        paddingRight: {
                            description: "The padding at the right of the chart.",
                            type: "integer",
                            minimum: 0,
                            maximum: 100
                        },
                        paddingBottom: {
                            description: "The padding at the bottom of the chart.",
                            type: "integer",
                            minimum: 0,
                            maximum: 100
                        },
                        paddingLeft: {
                            description: "The padding at the left of the chart.",
                            type: "integer",
                            minimum: 0,
                            maximum: 100
                        }
                    }
                },
                DateTimeRange: {
                    type: "object",
                    description: "Defines a date and time range.",
                    properties: {
                        fromDay: {
                            description: "The day of year index to start on (0 to 364/365).",
                            type: "integer",
                            minimum: 0,
                            maximum: 365
                        },
                        toDay: {
                            description: "The day of year index to finish on (0 to 364/365).",
                            type: "integer",
                            minimum: 0,
                            maximum: 365
                        },
                        fromTime: {
                            description: "he time of day to start at (0 to 24).",
                            type: "number",
                            minimum: 0,
                            maximum: 24
                        },
                        toTime: {
                            description: "he time of day to finish at (0 to 24).",
                            type: "number",
                            minimum: 0,
                            maximum: 24
                        },
                        startDayOfWeek: {
                            description: "The day of the week index the year starts on (0 to 6).",
                            type: "integer",
                            minimum: 0,
                            maximum: 6
                        },
                        dayFilter: {
                            description: "Bit flags representing the 7 days of the week (Mon to Sun).",
                            type: "integer",
                            minimum: 0,
                            maximum: 127
                        },
                        showSelector: {
                            description: "Whether or not to show the interactive date range selector.",
                            type: "boolean"
                        }
                    }
                },
                Comfort: {
                    type: "object",
                    description: "Defines human thermal comfort parameters.",
                    properties: {
                        dryBulbTemperature: {
                            description: "Air Temparature (degC).",
                            type: "number",
                            minimum: -50,
                            maximum: 100
                        },
                        relativeHumidity: {
                            description: "Relative Humidity (%).",
                            type: "number",
                            minimum: 0,
                            maximum: 100
                        },
                        clothingLevel: {
                            description: "Clothing Level (clo).",
                            type: "number",
                            minimum: 0,
                            maximum: 4
                        },
                        metabolicRate: {
                            description: "Matabolic Rate (met).",
                            type: "number",
                            minimum: 0,
                            maximum: 4
                        },
                        externalWork: {
                            description: "External Work Rate (met).",
                            type: "number",
                            minimum: 0,
                            maximum: 4
                        },
                        meanRadiantTemperature: {
                            description: "Mean Radiant Temparature (degC).",
                            type: "number",
                            minimum: -50,
                            maximum: 100
                        },
                        airVelocity: {
                            description: "Air Velocity (m/s).",
                            type: "number",
                            minimum: 0,
                            maximum: 2
                        },
                        meanOutdoorTemperature: {
                            description: "The center point of the comfort band (degC).",
                            type: "number",
                            minimum: -50,
                            maximum: 50
                        },
                        thermalMassEfficacy: {
                            description: "The relative amount of thermal mass (0: None, 0.25: Low, 0.5: Medium, 1: High)",
                            type: "number",
                            minimum: 0,
                            maximum: 1
                        },
                        solarGainsEfficacy: {
                            description: "The relative glazing ratio for passive solar gains (0-1).",
                            type: "number",
                            minimum: 0,
                            maximum: 1
                        },
                        internalHeatGains: {
                            description: "The relative amount of internal heat gains (0-1).",
                            type: "number",
                            minimum: 0,
                            maximum: 1
                        },
                        solarExposure: {
                            description: "The relative amount of exposure to the Sun, used for Heat Index.",
                            type: "number",
                            minimum: 0,
                            maximum: 1
                        },
                        trackTemperature: {
                            description: "Whether or not mean outdoor temperature is calculated dynamically from weather data.",
                            type: "boolean"
                        },
                        predictCLO: {
                            description: "Whether or not to predict clothing level from outdoor temperature.",
                            type: "boolean"
                        },
                        percentageInComfort: {
                            description: "Percentage In Comfort (%).",
                            type: "number",
                            minimum: 0,
                            maximum: 100
                        },
                        listOfComfortPoints: {
                            description: "Whether or not to predict clothing level from outdoor temperature.",
                            type: "list"
                        },
                    }
                },
                DisplayUnits: {
                    type: "object",
                    description: "The units to use when displaying various metrics.",
                    properties: {
                        temperature: {
                            description: "Which temperature units to use.",
                            "enum": ["°C", "°F", "°R", "K"],
                            type: "string"
                        },
                        humidity: {
                            description: "Which absolute humidity units to use.",
                            "enum": ["kg/kg", "g/kg", "lb/lb", "gr/lb"],
                            type: "string"
                        },
                        pressure: {
                            description: "Which pressure units to use.",
                            "enum": ["Pa", "kPa", "mmHg", "inHg", "Psi", "atm", "bar"],
                            type: "string"
                        },
                        volume: {
                            description: "Which specific volume units to use.",
                            "enum": ["m3/kg", "ft3/lb"],
                            type: "string"
                        },
                        enthalpy: {
                            description: "Which enthalpy units to use.",
                            "enum": ["J/kg", "kJ/kg", "Btu/lb"],
                            type: "string"
                        },
                        velocity: {
                            description: "Which air velocity units to use.",
                            "enum": ["m/s", "km/h", "ft/s", "fpm", "mph", "kn"],
                            type: "string"
                        }
                    }
                }
            }
        }), e.contentWindow.onChangeHandler = s.Manager.paramDataEdited, e.classList.remove("loading"),
            s.Manager.formatParamData());
    }

    var i = new pdSVG.PsychChart({
        elementId: "#chart-psychro",
        focusId: "#layout-chart-panel",
        xMin: t.Chart.dryBulbMin,
        xMax: t.Chart.dryBulbMax,
        yMax: t.Chart.absHumidityMax,
        atmPressure: t.Chart.atmPressure,
        legendAlign: t.Chart.legendAlign,
        verticalAxis: t.Chart.verticalAxis,
        gridFadeCells: t.Chart.gridFadeCells,
        showDryBulb: t.Chart.showDryBulb,
        showAbsHumidity: t.Chart.showAbsHumidity,
        showRelHumidity: t.Chart.showRelHumidity,
        showWetBulb: t.Chart.showWetBulb,
        showVapPressure: t.Chart.showVapPressure,
        showAirVolume: t.Chart.showAirVolume,
        showEnthalpy: t.Chart.showEnthalpy,
        showComfortGrid: t.Chart.showComfortGrid,
        showIndicator: t.Chart.showIndicator,
        lineHilite: t.Chart.lineHilite,
        infoOverlay: t.Chart.infoOverlay,
        paddingTop: t.Chart.paddingTop,
        paddingRight: t.Chart.paddingRight,
        paddingBottom: t.Chart.paddingBottom,
        paddingLeft: t.Chart.paddingLeft,
        gridCellGap: t.Chart.gridCellGap,
        onIndicatorChange: function (e) {
            s.setValueWithoutUndo(s.Comfort.dryBulbTemperature, e.dryBulb), s.setValueWithoutUndo(s.Comfort.relativeHumidity, e.relativeHumidity);
        },
        throttledRedraw: 25
    }), o = new pd.SolarPosition().year(2017), n = new pdWeather.Data(), s = new function () {
        var e = this;
        this.UndoManager = new ko.UndoRedoQueue(), this.updateOnChange = !0, this.setValueWithoutUndo = function (e, t) {
            e && (e.undoIgnore = !0, e(t), e.undoIgnore = !1);
        };
        var r = new pdDOM.ThrottledUpdate(function () {
            O();
        }, 25), b = new pdDOM.ThrottledUpdate(function () {
            e.Metric.updateSelection();
        }, 25), C = new pdDOM.ThrottledUpdate(function () {
            i.setDataScale(e.Metric.min(), e.Metric.max());
        }, 25), M = new pdDOM.ThrottledUpdate(function () {
            i.updateComfort();
        }, 25);
        this.SaveAs = new pdKO.SaveAsViewModel(e), this.NumberEditor = new pdKO.NumericEditViewModel(e, {
            id: "#popover-editnum"
        }), this.NumberEditor.setSelectableValue = function (t) {
            if (pd.isObject(t) && t.name) {
                var a = e.NumberEditor.payload();
                e.NumberEditor.value(a && a.convert ? a.convert(t.value) : t.value), e.NumberEditor.selectableTitle(t.name);
            }
        }, this.NumberEditor.selectableValue = ko.observable(), this.NumberEditor.selectableTitle = ko.observable(""),
            this.NumberEditor.selectableDefaultTitle = ko.observable(""), this.NumberEditor.selectableValuesList = ko.observableArray([]),
            this.NumberEditor.hasSelectableValues = ko.computed(function () {
                return e.NumberEditor.selectableValuesList().length > 0;
            }, this), this.DimensionEditor = new pdKO.DimensionEditViewModel(e, {
                id: "#popover-editdim"
            }), this.DateTime = new pdKO.DateTimeViewModel(e, t.DateTime, o), this.DateTime.formatDate = ko.computed(function () {
                return pd.DateTime.formatDate(e.DateTime.dayOfYear());
            }, this), this.DateTime.onDateTimeChange = function (a, r) {
                if (e.updateOnChange && a && r && e.Weather.fileLoaded()) {
                    var o = a.dayOfYear();
                    if (t.Comfort.trackTemperature) {
                        var s = n.calc30DayMeanOutdoorTemperature(o);
                        e.Comfort.meanOutdoorTemperature(s);
                    }
                    if (t.Comfort.predictCLO) {
                        var l;
                        l = e.Metric.showSelector() ? n.calcAverageTemperatureAtHour(t.DateTimeRange.fromDay, t.DateTimeRange.toDay, 6) : n.getValue(n.annualHourly.tempDryBulb, o, 6);
                        var d = i.getComfort().calcAdaptiveCLO(l);
                        e.Comfort.clothingLevel(d);
                    }
                }
            }, this.Metric = new function () {
                var a = this, u = !1;

                function m() {
                    e.updateOnChange && b.trigger();
                }

                this.list = ko.observableArray([]), this.sliderRangeMin = ko.observable(0), this.sliderRangeMax = ko.observable(100),
                    this.sliderRangeStep = ko.observable(1), this.sliderDecimals = ko.observable(1),
                    this.metricMin = ko.observable(0), this.metricMax = ko.observable(100), this.metricStep = ko.observable(1),
                    this.metricDecimals = ko.observable(1), this.metricUnits = ko.observable("%"), this.min = ko.observable(0),
                    this.max = ko.observable(100), this.units = ko.observable("%"), this.dataMin = ko.observable(0),
                    this.dataMax = ko.observable(100), this.resultMin = ko.observable(0), this.resultMax = ko.observable(0),
                    this.scaleMin = ko.computed({
                        read: function () {
                            return +a.min();
                        },
                        write: function (e) {
                            var t = !pd.closeTo(+a.min(), +e);
                            a.min(+e), t && C.trigger();
                        },
                        owner: a
                    }), this.scaleMinTitle = ko.computed(function () {
                        return "Minimum Value <small class='pull-right'>" + a.units() + "</small>";
                    }, this), this.scaleMax = ko.computed({
                        read: function () {
                            return +a.max();
                        },
                        write: function (e) {
                            var t = !pd.closeTo(+a.max(), +e);
                            a.max(+e), t && C.trigger();
                        },
                        owner: a
                    }), this.scaleMaxTitle = ko.computed(function () {
                        return "Maximum Value <small class='pull-right'>" + a.units() + "</small>";
                    }, this), this.operation = ko.observable(0), this.operation.subscribe(m), this.summation = ko.observable(2),
                    this.summation.subscribe(m), this.thresholdLower = ko.observable(.25), this.thresholdLower.subscribe(m),
                    this.thresholdLowerEnable = ko.computed(function () {
                        var e = a.operation();
                        return 3 == e || 5 == e;
                    }, this), this.thresholdUpper = ko.observable(.75), this.thresholdUpper.subscribe(m),
                    this.thresholdUpperEnable = ko.computed(function () {
                        var e = a.operation();
                        return 4 == e || 5 == e;
                    }, this), this.selectionIndex = ko.observable(-1), this.selection = ko.observable(null),
                    this.selection.subscribe(function () {
                        u = !0, m();
                    }), this.calculateFrequency = ko.computed(function () {
                        var e = a.selection();
                        return e && "FRQ" == e.abbrev;
                    }, this), this.sliderLockScale = ko.observable(!1), this.metricFormat = ko.observable(p),
                    this.metricPrefix = ko.observable(0), this.metricPrefix.subscribe(function (t) {
                        if (e.updateOnChange) {
                            var r = a.selection();
                            r && (r.prefix = pd.toInteger(t, r.prefix), i.redraw());
                        }
                    }), this.filterList = ko.observableArray([]), this.filterOp = ko.observable(0),
                    this.filterOp.subscribe(m), this.filterLower = ko.observable(0), this.filterLower.subscribe(m),
                    this.filterLowerEnable = ko.computed(function () {
                        var e = a.filterOp();
                        return 1 == e || 3 == e;
                    }, this), this.filterUpper = ko.observable(1), this.filterUpper.subscribe(m), this.filterUpperEnable = ko.computed(function () {
                        return a.filterOp() > 1;
                    }, this), this.filterMin = ko.observable(0), this.filterMax = ko.observable(1),
                    this.filterStep = ko.observable(.1), this.filterMetric = ko.observable(null), this.filterMetric.subscribe(function (t) {
                        if (t && !e.UndoManager.isWorking()) if (a.filterMin(t.min), a.filterMax(t.max),
                            a.filterStep(.1 * t.step), pd.isArray(t.data)) {
                            var r, i, o, n = t.data, s = n.length;
                            if (t.format == h && s >= 365) {
                                i = o = n[0][0];
                                for (var l = 0; l < s; ++l) for (var d = 0; d < 24; ++d) r = n[l][d], i > r && (i = r),
                                    o < r && (o = r);
                            } else if (t.format == c && s >= 8760) {
                                var u = 0, m = t.length > 8783;
                                i = o = n[0];
                                for (var l = 0, p = m ? 366 : 365; l < p; ++l) {
                                    for (var d = 0; d < 24; ++d) r = n[u + d], i > r && (i = r), o < r && (o = r);
                                    u += 24;
                                }
                            }
                            a.filterLower(i), a.filterUpper(o);
                        } else a.filterLower(t.min), a.filterUpper(t.max);
                    }), this.dbtAxisMetricList = ko.observableArray([]), this.relAxisMetricList = ko.observableArray([]),
                    this.dbtAxisMetric = ko.observable(null), this.dbtAxisMetric.subscribe(function (t) {
                        t && e.updateOnChange && n.annualHourly.tempDryBulb != t.data && n.setValuesFromArray(n.annualHourly.tempDryBulb, t.data);
                    }), this.relAxisMetric = ko.observable(null), this.relAxisMetric.subscribe(function (t) {
                        t && e.updateOnChange && n.annualHourly.relHumidity != t.data && (n.setValuesFromArray(n.annualHourly.relHumidity, t.data),
                            n.dayCount = n.annualHourly.relHumidity.length);
                    }), this.gridFadeCells = ko.observable(t.Chart.gridFadeCells), this.dataOverlay = ko.observable(t.Chart.dataOverlay > 0 ? t.Chart.dataOverlay : 1),
                    this.dataOverlay.subscribe(m), this.gridHighRes = ko.observable(t.Chart.gridHighRes),
                    this.gridHighRes.subscribe(m), this.updateSelection = function (t) {
                        if (!e.UndoManager.isWorking()) {
                            e.updateOnChange = !1;
                            var r = a.selection();
                            if (r) {
                                a.metricMin(r.min), a.metricMax(r.max), a.metricStep(.1 * r.step), a.metricDecimals(r.decimals),
                                    a.metricPrefix(r.metricPrefix), a.metricFormat(r.format), a.metricUnits(r.units);
                                var i = k(!1);
                                a.sliderRangeMin(r.min), a.sliderRangeMax(r.max), a.sliderRangeStep(i.decimals > 1 ? .1 * r.step : r.step),
                                    a.sliderDecimals(i.decimals), a.resultMin(i.min), a.resultMax(i.max), a.calculateFrequency() ? (a.dataMin(i.min),
                                        a.dataMax(i.max)) : (a.dataMin(r.dataMin), a.dataMax(r.dataMax)), a.units(i.units),
                                    (t || u || !a.sliderLockScale()) && (u = !1, a.min(i.min), a.max(i.max));
                                var o = a.list.indexOf(r);
                                o != a.selectionIndex() && (a.thresholdLower(i.min + .25 * i.value), a.thresholdUpper(i.min + .75 * i.value)),
                                    a.selectionIndex(o);
                            } else a.selectionIndex(-1);
                            if (!a.calculateFrequency() && a.operation() > 2) {
                                switch (a.summation()) {
                                    default:
                                    case 0:
                                        a.sliderRangeMin(0), a.sliderRangeMax(100), a.sliderRangeStep(1), a.sliderDecimals(3);
                                        break;

                                    case 1:
                                        a.sliderRangeMin(0), a.sliderRangeMax(1), a.sliderRangeStep(.001), a.sliderDecimals(5);
                                        break;

                                    case 2:
                                        a.sliderRangeMin(0), a.sliderRangeMax(Math.max(10, pd.snapTo(2 * a.resultMax(), 10))),
                                            a.sliderRangeStep(.1), a.sliderDecimals(0);
                                }
                                a.sliderRangeMin.valueHasMutated(), a.sliderRangeMax.valueHasMutated(), a.sliderRangeStep.valueHasMutated(),
                                    a.sliderDecimals.valueHasMutated();
                            }
                            a.min.valueHasMutated(), a.max.valueHasMutated(), a.metricMin.valueHasMutated(),
                                a.metricMax.valueHasMutated(), a.metricStep.valueHasMutated(), a.metricDecimals.valueHasMutated(),
                                e.updateOnChange = !0;
                        }
                    }, this.fromTime = ko.observable(Math.floor(t.DateTimeRange.fromTime)), this.toTime = ko.observable(Math.floor(t.DateTimeRange.toTime)),
                    this.dateRangeStart = ko.observable(new Date("2017-01-01")), this.dateRangeEnd = ko.observable(new Date("2017-12-31")),
                    this.dateRangeStart().setDOY(t.DateTimeRange.fromDay), this.dateRangeEnd().setDOY(t.DateTimeRange.toDay),
                    this.fromDay = ko.observable(Math.floor(t.DateTimeRange.fromDay)), this.fromDay.subscribe(function (a) {
                        t.DateTimeRange.fromDay = pd.toInteger(a, t.DateTimeRange.fromDay), t.DateTimeRange.fromDay = pd.constrainTo(t.DateTimeRange.fromDay, 0, 365),
                            t.Chart.infoOverlay > 0 && 2 != t.Chart.infoOverlay && e.DateTime.dayOfYear(pd.constrainTo(.5 * (t.DateTimeRange.fromDay + t.DateTimeRange.toDay) - 1, 0, 365)),
                            e.updateOnChange && t.Chart.dataOverlay > 0 && r.trigger();
                    }), this.toDay = ko.observable(Math.floor(t.DateTimeRange.toDay)), this.toDay.subscribe(function (a) {
                        t.DateTimeRange.toDay = pd.toInteger(a, t.DateTimeRange.toDay), t.DateTimeRange.toDay = pd.constrainTo(t.DateTimeRange.toDay, 0, 365),
                            1 == t.Chart.infoOverlay && e.DateTime.dayOfYear(pd.constrainTo(.5 * (t.DateTimeRange.fromDay + t.DateTimeRange.toDay) - 1, 0, 365)),
                            e.updateOnChange && t.Chart.dataOverlay > 0 && r.trigger();
                    }), this.year = function () {
                        d(0, s.Chart.maxDayIndex());
                    }, this.month = function (e, a) {
                        var r = pd.constrainTo(t.DateTimeRange.fromDay, 0, 334),
                            i = t.DateTimeRange.toDay - t.DateTimeRange.fromDay;
                        pd.closeTo(i, 30, 2) && (r = a.shiftKey ? pd.closeTo(t.DateTimeRange.fromDay, 0, 2) ? 334 : pd.DateTime.snapToNearestMonth(r - 30, o.year()) : pd.closeTo(t.DateTimeRange.fromDay, 334, 2) ? 0 : pd.DateTime.snapToNearestMonth(r + 30, o.year())),
                            d(pd.DateTime.snapToNearestMonth(r, o.year()), pd.DateTime.snapToNearestMonth(r + 31, o.year()));
                    }, this.day = function () {
                        var e = t.DateTimeRange.fromDay, a = t.DateTimeRange.toDay - t.DateTimeRange.fromDay;
                        a < 2 && (event.shiftKey ? e < 1 ? e = s.Chart.maxDayIndex() : --e : e >= s.Chart.maxDayIndex() ? e = 0 : ++e),
                            d(e, e);
                    }, this.updateDatePickerRange = function () {
                        var e, r = o.year(), i = new Date(r, 0, 1), n = new Date(r, 0, 1);
                        e = pd.DateTime.getDayAndMonth(t.DateTimeRange.fromDay, r), i.setMonth(e.month),
                            i.setDate(e.day), e = pd.DateTime.getDayAndMonth(t.DateTimeRange.toDay, r), n.setMonth(e.month),
                            n.setDate(e.day), a.dateRangeStart(i), a.dateRangeEnd(n);
                    }, this.setDateRange = function (e) {
                        var t = o.year(), r = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                        pd.DateTime.isLeapYear(t) && (r[1] = 29);
                        var i = new Date(t, 0, 1), n = new Date(t, 0, 1);
                        switch (e) {
                            case -99:
                                i.setMonth(0), i.setDate(1), n.setMonth(11), n.setDate(31);
                                break;

                            case -14:
                                o.latitude() < 0 ? (i.setMonth(11), i.setDate(1), n.setMonth(1), n.setDate(r[1])) : (i.setMonth(5),
                                    i.setDate(1), n.setMonth(7), n.setDate(r[7]));
                                break;

                            case -13:
                                o.latitude() < 0 ? (i.setMonth(2), i.setDate(1), n.setMonth(4), n.setDate(r[4])) : (i.setMonth(8),
                                    i.setDate(1), n.setMonth(10), n.setDate(r[10]));
                                break;

                            case -12:
                                o.latitude() < 0 ? (i.setMonth(5), i.setDate(1), n.setMonth(7), n.setDate(r[7])) : (i.setMonth(11),
                                    i.setDate(1), n.setMonth(1), n.setDate(r[1]));
                                break;

                            case -11:
                                o.latitude() < 0 ? (i.setMonth(8), i.setDate(1), n.setMonth(10), n.setDate(r[10])) : (i.setMonth(2),
                                    i.setDate(1), n.setMonth(4), n.setDate(r[4]));
                                break;

                            default:
                                if (!(e >= 0 && e < 12)) return;
                                i.setMonth(e), i.setDate(1), n.setMonth(e), n.setDate(r[e]);
                        }
                        a.dateRangeStart(i), a.dateRangeEnd(n);
                    }, this.startDayOfWeek = ko.observable(t.DateTimeRange.startDayOfWeek), this.dayFilter = [ko.observable(1 & t.DateTimeRange.dayFilter), ko.observable(2 & t.DateTimeRange.dayFilter), ko.observable(4 & t.DateTimeRange.dayFilter), ko.observable(8 & t.DateTimeRange.dayFilter), ko.observable(16 & t.DateTimeRange.dayFilter), ko.observable(32 & t.DateTimeRange.dayFilter), ko.observable(64 & t.DateTimeRange.dayFilter)],
                    this.showSelector = ko.observable(t.DateTimeRange.showSelector), this.showSelector.subscribe(function (e) {
                        t.DateTimeRange.showSelector = pd.toBoolean(e, t.DateTimeRange.showSelector), a.initialiseDateRangeData(),
                            F(), t.DateTimeRange.showSelector ? $("#chart-range").fadeIn() : $("#chart-range").fadeOut();
                    }), this.initialiseDateRangeData = function () {
                        t.DateTimeRange.showSelector && a.selection() && l.setAnnualWeatherData(a.selection(), {
                            units: a.calculateFrequency() ? "°C" : null,
                            showComfortBand: !1
                        });
                    }, this.selection.onUndo = function () {
                        r.trigger();
                    }, this.updateDateRange = function () {
                        t.DateTimeRange.fromDay = a.dateRangeStart().getDOY(), t.DateTimeRange.toDay = a.dateRangeEnd().getDOY(),
                            r.trigger();
                    }, this.updateChart = function () {
                        return e.updateOnChange = !1, $("#modal-metric").modal("hide"), t.DateTimeRange.dayFilter = 0,
                            a.dayFilter[0]() && (t.DateTimeRange.dayFilter += 1), a.dayFilter[1]() && (t.DateTimeRange.dayFilter += 2),
                            a.dayFilter[2]() && (t.DateTimeRange.dayFilter += 4), a.dayFilter[3]() && (t.DateTimeRange.dayFilter += 8),
                            a.dayFilter[4]() && (t.DateTimeRange.dayFilter += 16), a.dayFilter[5]() && (t.DateTimeRange.dayFilter += 32),
                            a.dayFilter[6]() && (t.DateTimeRange.dayFilter += 64), t.DateTimeRange.startDayOfWeek = a.startDayOfWeek(),
                            a.fromTime(t.DateTimeRange.fromTime = a.fromTime()), a.toTime(t.DateTimeRange.toTime = a.toTime()),
                            e.Chart.gridFadeCells(a.gridFadeCells()), e.Chart.gridHighRes(a.gridHighRes()),
                            e.Chart.dataOverlay(a.dataOverlay()), e.updateOnChange = !0, a.initialiseDateRangeData(),
                            d(a.dateRangeStart().getDOY(), a.dateRangeEnd().getDOY()), this;
                    };
            }(), this.Weather = new function () {
                var t = this;

                function a(e, t) {
                    var a, r, i;
                    if (t.format = h, t.dataMin = 0, t.dataMax = 1, t.data && t.data.length) {
                        r = i = t.data[0][0];
                        for (var o = 0; o < 365; ++o) for (var n = 0; n < 24; ++n) a = t.data[o][n], r > a && (r = a),
                            i < a && (i = a);
                        t.dataMin = r, t.dataMax = i;
                    }
                    e.push(t);
                }

                this.geomapLoaded = ko.observable(!1), this.fileLoaded = ko.observable(!1), this.stationName = ko.observable(n.stationName),
                    this.stationState = ko.observable(n.stateOrRegion), this.stationCountry = ko.observable(n.country),
                    this.stationId = ko.observable(n.WMO), this.stationLatitude = ko.observable("-"),
                    this.stationLongitude = ko.observable("-"), this.stationTimezone = ko.observable("-"),
                    this.stationElevation = ko.observable("-"), this.updateWeatherStation = function () {
                        e.updateOnChange = !1;
                        var s = n.stationName;
                        n.stateOrRegion && "-" != n.stateOrRegion && (s += ", " + n.stateOrRegion), n.country && "-" != n.country && (s += ", " + n.country),
                            s = s.replace(/\s\s+/g, " "), t.stationName(n.stationName), t.stationState(n.stateOrRegion),
                            t.stationCountry(n.country), t.stationId(n.WMO), o.setLocation(n.latitude, n.longitude, n.timezone),
                            t.stationLatitude(n.latitude.toFixed(3)), t.stationLongitude(n.longitude.toFixed(3)),
                            t.stationTimezone(o.formatAsTimezone(n.timezone)), t.stationElevation(pd.Dimension.formatDistance(1e3 * n.elevation, 0, 1, !0)),
                            e.Metric.filterList.removeAll();
                        for (var l = 0; l < 26; ++l) a(e.Metric.filterList, n.getMetric(l));
                        e.Metric.filterMetric(e.Metric.filterList()[0]), e.Metric.dbtAxisMetricList.removeAll(),
                            e.Metric.dbtAxisMetricList.push(e.Metric.filterList()[0], e.Metric.filterList()[1]),
                            e.Metric.dbtAxisMetric(e.Metric.filterList()[0]), e.Metric.relAxisMetricList.removeAll(),
                            e.Metric.relAxisMetricList.push(e.Metric.filterList()[2]), e.Metric.relAxisMetric(e.Metric.filterList()[2]),
                            e.Metric.list.removeAll(), a(e.Metric.list, {
                                format: h,
                                data: n.annualHourly.tempDryBulb,
                                name: "Temperature/Humidity Distribution",
                                shortName: "Temp/Humid Dist.",
                                abbrev: "FRQ",
                                units: "Hrs",
                                dataMin: 0,
                                dataMax: 1,
                                decimals: 0,
                                min: 0,
                                max: 1e3,
                                step: 1
                            });
                        var d = e.Metric.list()[0], u = pd.snapTo(i.getTemperatureConverter().fromCelsius(0), 5),
                            m = Math.min(u, pd.snapTo(i.getTemperatureConverter().fromCelsius(d.dataMin) - 2.5, 5)),
                            c = pd.snapTo(i.getTemperatureConverter().fromCelsius(d.dataMax) + 2.5, 5);
                        e.Chart.dryBulbMaxConverted() < c && e.Chart.dryBulbMaxConverted(c), e.Chart.dryBulbMinConverted(m);
                        var p = e.Metric.filterList();
                        a(e.Metric.list, p[1]);
                        for (var l = 3; l < 26; ++l) a(e.Metric.list, p[l]);
                        if (e.Metric.list().length > 0) {
                            var g = e.Metric.selectionIndex();
                            g = pd.constrainTo(g, 0, e.Metric.list().length - 1), e.Metric.selection(e.Metric.list()[g]);
                        } else e.Metric.selection(null);
                        t.fileLoaded(!0), e.Chart.maxDayIndex(n.dayCount - 1), e.Manager.dataLoaded(n.dayCount >= 365),
                            e.Metric.initialiseDateRangeData(), e.Metric.updateSelection(!0), i.updateComfort(!0),
                            r.trigger(), setTimeout(function () {
                                $("#content-data").collapse("show");
                                $("#content-automate-data").collapse("show");
                            }, 250), e.updateOnChange = !0;
                    };
            }(), this.DisplayUnits = new function () {
                var a = this;

                function r(e) {
                    e && a.hasChanged(!0);
                }

                this.temperature = ko.observable("°C"), this.temperatureMin = ko.observable(-50),
                    this.temperatureMax = ko.observable(99.9), this.temperature.subscribe(function (r) {
                        var o = i.getTemperatureConverter(), n = pdUnits.Temperature.getUnitsFromAbbrev(r);
                        i.setTemperatureUnits(n), t.DisplayUnits.temperature = o.getAbbrev(), a.temperatureMin(pd.snapTo(o.fromCelsius(-50), 5)),
                            a.temperatureMax(pd.snapTo(o.fromCelsius(99.9), 5)), e.Chart.dryBulbMinConverted(o.min),
                            e.Chart.dryBulbMaxConverted(o.max), e.Chart.dryBulbMin.valueHasMutated(), e.Chart.dryBulbMax.valueHasMutated(),
                            e.Comfort.dryBulbTemperature.valueHasMutated(), e.Comfort.meanRadiantTemperature.valueHasMutated(),
                            e.Comfort.meanOutdoorTemperature.valueHasMutated();
                    }), this.humidity = ko.observable("g/kg"), this.humidityMin = ko.observable(0),
                    this.humidityMax = ko.observable(50), this.humidityStep = ko.observable(.1), this.humidityDecimals = ko.observable(1),
                    this.humidity.subscribe(function (r) {
                        var o = i.getHumidityRatioConverter(), n = pdUnits.HumidityRatio.getUnitsFromAbbrev(r);
                        switch (i.setHumidityRatioUnits(n), t.DisplayUnits.humidity = o.getAbbrev(), o.units) {
                            default:
                                a.humidityMin(0), a.humidityMax(.05), a.humidityStep(1e-4), a.humidityDecimals(4);
                                break;

                            case pdUnits.GRAMSPERKILOGRAM:
                                a.humidityMin(0), a.humidityMax(50), a.humidityStep(.1), a.humidityDecimals(1);
                                break;

                            case pdUnits.GRAINSPERPOUND:
                                a.humidityMin(0), a.humidityMax(350), a.humidityStep(.5), a.humidityDecimals(1);
                        }
                        e.Chart.absHumidityMaxConverted(o.max), e.Chart.absHumidityMax.valueHasMutated();
                    }), this.pressure = ko.observable("kPa"), this.pressureMin = ko.observable(51.365),
                    this.pressureMax = ko.observable(131.366), this.pressureStep = ko.observable(.1),
                    this.pressure.subscribe(function (r) {
                        var o = i.getPressureConverter(), n = pdUnits.Pressure.getUnitsFromAbbrev(r);
                        i.setPressureUnits(n), t.DisplayUnits.pressure = o.getAbbrev();
                        var s = .1 * o.tickMinor;
                        a.pressureMin(pd.snapTo(o.fromKiloPascal(51.365), s)), a.pressureMax(pd.snapTo(o.fromKiloPascal(131.366), s)),
                            a.pressureStep(s), e.Chart.atmPressureConverted(o.fromKiloPascal(t.Chart.atmPressure)),
                            e.Chart.atmPressure.valueHasMutated();
                    }), this.volume = ko.observable("m3/kg"), this.volume.subscribe(function (e) {
                        var a = i.getSpecificVolumeConverter(), r = pdUnits.SpecificVolume.getUnitsFromAbbrev(e);
                        i.setSpecificVolumeUnits(r), t.DisplayUnits.volume = a.getAbbrev();
                    }), this.enthalpy = ko.observable("kJ/kg"), this.enthalpy.subscribe(function (e) {
                        var a = i.getEnthalpyConverter(), r = pdUnits.Enthalpy.getUnitsFromAbbrev(e);
                        i.setEnthalpyUnits(r), t.DisplayUnits.enthalpy = a.getAbbrev();
                    }), this.velocity = ko.observable("m/s"), this.velocityMin = ko.observable(0), this.velocityMax = ko.observable(2),
                    this.velocityStep = ko.observable(.01), this.velocity.subscribe(function (r) {
                        var o = i.getVelocityConverter(), n = pdUnits.Velocity.getUnitsFromAbbrev(r);
                        switch (i.setVelocityUnits(n), t.DisplayUnits.velocity = o.getAbbrev(), o.units) {
                            default:
                                a.velocityMin(0), a.velocityMax(2), a.velocityStep(.01);
                                break;

                            case pdUnits.KILOMETERSPERHOUR:
                                a.velocityMin(0), a.velocityMax(7.2), a.velocityStep(.01);
                                break;

                            case pdUnits.FEETPERMINUTE:
                                a.velocityMin(0), a.velocityMax(395), a.velocityStep(1);
                                break;

                            case pdUnits.FEETPERSECOND:
                                a.velocityMin(0), a.velocityMax(6.6), a.velocityStep(.01);
                                break;

                            case pdUnits.MILESPERHOUR:
                                a.velocityMin(0), a.velocityMax(4.5), a.velocityStep(.01);
                                break;

                            case pdUnits.KNOTS:
                                a.velocityMin(0), a.velocityMax(4), a.velocityStep(.01);
                        }
                        e.Comfort.airVelocityConverted(o.fromMetersPerSecond(t.Comfort.airVelocity)), e.Comfort.airVelocity.valueHasMutated();
                    }), this.hasChanged = ko.observable(!1), this._temperatureModal = ko.observable(t.DisplayUnits.temperature),
                    this._temperatureModal.subscribe(r), this._humidityModal = ko.observable(t.DisplayUnits.humidity),
                    this._humidityModal.subscribe(r), this._pressureModal = ko.observable(t.DisplayUnits.pressure),
                    this._pressureModal.subscribe(r), this._volumeModal = ko.observable(t.DisplayUnits.volume),
                    this._volumeModal.subscribe(r), this._enthalpyModal = ko.observable(t.DisplayUnits.enthalpy),
                    this._enthalpyModal.subscribe(r), this._velocityModal = ko.observable(t.DisplayUnits.velocity),
                    this._velocityModal.subscribe(r), this.syncWithChart = function () {
                        a._temperatureModal(i.getTemperatureConverter().getAbbrev()), a._humidityModal(i.getHumidityRatioConverter().getAbbrev()),
                            a._pressureModal(i.getPressureConverter().getAbbrev()), a._volumeModal(i.getSpecificVolumeConverter().getAbbrev()),
                            a._enthalpyModal(i.getEnthalpyConverter().getAbbrev()), a._velocityModal(i.getVelocityConverter().getAbbrev()),
                            a.hasChanged(!1);
                    }, this.applyChanges = function () {
                        a.temperature(a._temperatureModal()), a.humidity(a._humidityModal()), a.pressure(a._pressureModal()),
                            a.volume(a._volumeModal()), a.enthalpy(a._enthalpyModal()), a.velocity(a._velocityModal()),
                            $("#modal-units").modal("hide"), a.hasChanged(!1), O();
                    }, this.useMetric = function () {
                        a._temperatureModal("°C"), a._humidityModal("g/kg"), a._pressureModal("kPa"), a._volumeModal("m3/kg"),
                            a._enthalpyModal("kJ/kg"), a._velocityModal("m/s");
                    }, this.useImperial = function () {
                        a._temperatureModal("°F"), a._humidityModal("gr/lb"), a._pressureModal("Psi"), a._volumeModal("ft3/lb"),
                            a._enthalpyModal("Btu/lb"), a._velocityModal("ft/s");
                    };
            }(), this.Chart = new function () {
                var a = this;
                this.dryBulbMin = ko.observable(t.Chart.dryBulbMin), this.dryBulbMin.subscribe(function (e) {
                    t.Chart.dryBulbMin = pd.constrainTo(pd.toNumber(e, a.dryBulbMin()), -50, 100), a.dryBulbMin.undoIgnore || (i.set({
                        xMin: t.Chart.dryBulbMin
                    }), t.Chart.dryBulbMax = i.getMaxTemperature(), t.Chart.dataOverlay > 0 && r.trigger());
                }), this.dryBulbMinConverted = ko.computed({
                    read: function () {
                        return i.getTemperatureConverter().fromCelsius(a.dryBulbMin());
                    },
                    write: function (e) {
                        a.dryBulbMin(i.getTemperatureConverter().toCelsius(e));
                    },
                    owner: a
                }), this.dryBulbMax = ko.observable(t.Chart.dryBulbMax), this.dryBulbMax.subscribe(function (e) {
                    t.Chart.dryBulbMax = pd.constrainTo(pd.toNumber(e, a.dryBulbMax()), -50, 100), a.dryBulbMax.undoIgnore || (i.set({
                        xMax: t.Chart.dryBulbMax
                    }), t.Chart.dryBulbMin = i.getMinTemperature(), t.Chart.dataOverlay > 0 && r.trigger());
                }), this.dryBulbMaxConverted = ko.computed({
                    read: function () {
                        return i.getTemperatureConverter().fromCelsius(a.dryBulbMax());
                    },
                    write: function (e) {
                        a.dryBulbMax(i.getTemperatureConverter().toCelsius(e));
                    },
                    owner: a
                }), this.absHumidityMax = ko.observable(t.Chart.absHumidityMax), this.absHumidityMax.subscribe(function (e) {
                    t.Chart.absHumidityMax = pd.constrainTo(pd.toNumber(e, a.absHumidityMax()), 0, 50),
                        a.absHumidityMax.undoIgnore || (i.set({
                            yMax: t.Chart.absHumidityMax
                        }), t.Chart.dataOverlay > 0 && r.trigger());
                }), this.absHumidityMaxConverted = ko.computed({
                    read: function () {
                        return i.getHumidityRatioConverter().fromGramsPerKilogram(a.absHumidityMax());
                    },
                    write: function (e) {
                        a.absHumidityMax(i.getHumidityRatioConverter().toGramsPerKilogram(e));
                    },
                    owner: a
                }), this.atmPressure = ko.observable(t.Chart.atmPressure), this.atmPressure.subscribe(function (e) {
                    t.Chart.atmPressure = pd.constrainTo(pd.toNumber(e, a.atmPressure()), 51.365, 131.366),
                        a.atmPressure.undoIgnore || (i.set({
                            atmPressure: t.Chart.atmPressure
                        }), t.Chart.dataOverlay > 0 && r.trigger());
                }), this.atmPressureConverted = ko.computed({
                    read: function () {
                        return i.getPressureConverter().fromKiloPascal(a.atmPressure());
                    },
                    write: function (e) {
                        a.atmPressure(i.getPressureConverter().toKiloPascal(e));
                    },
                    owner: a
                }), this.legendAlign = ko.observable(t.Chart.legendAlign), this.legendAlign.subscribe(function (e) {
                    t.Chart.legendAlign = pd.toInteger(e, t.Chart.legendAlign), t.Chart.legendAlign = pd.constrainTo(t.Chart.legendAlign, 0, 32),
                        i.set({
                            legendAlign: t.Chart.legendAlign
                        });
                }), this.verticalAxis = ko.observable(t.Chart.verticalAxis), this.verticalAxis.subscribe(function (a) {
                    t.Chart.verticalAxis = pd.toInteger(a, t.Chart.verticalAxis), t.Chart.verticalAxis = pd.constrainTo(t.Chart.verticalAxis, 0, 1),
                        e.updateOnChange ? i.verticalAxis(t.Chart.verticalAxis) : i.set({
                            verticalAxis: t.Chart.verticalAxis
                        });
                }), this.detailMode = ko.observable(t.Chart.detailMode ? 1 : 0), this.detailMode.subscribe(function (e) {
                    t.Chart.detailMode = pd.toBoolean(e, t.Chart.detailMode), i.set({
                        detailMode: t.Chart.detailMode
                    });
                }), this.detailModeDecimals = ko.computed(function () {
                    return a.detailMode() ? 2 : 1;
                }, this), this.detailModeStep = ko.computed(function () {
                    return a.detailMode() ? .01 : .1;
                }, this), this.title = ko.observable(""), this.title.subscribe(function (e) {
                    i.title(e.toString());
                }), this.subTitle = ko.observable(""), this.subTitle.subscribe(function (e) {
                    i.subTitle(e.toString());
                }), this.units = ko.observable(""), this.units.subscribe(function (t) {
                    e.Metric.units(t.toString()), i.units(t.toString());
                }), this.gridVerticalAxis = ko.observable(t.Chart.gridVerticalAxis), this.gridVerticalAxis.subscribe(function (e) {
                    t.Chart.gridVerticalAxis = pd.toInteger(e, t.Chart.gridVerticalAxis), t.Chart.gridVerticalAxis = pd.constrainTo(t.Chart.gridVerticalAxis, -1, 1);
                }), this.gridHighRes = ko.observable(t.Chart.gridHighRes), this.gridHighRes.subscribe(function (a) {
                    t.Chart.gridHighRes = pd.toBoolean(a, t.Chart.gridHighRes), e.Metric.gridHighRes(t.Chart.gridHighRes);
                }), this.gridFadeCells = ko.observable(t.Chart.gridFadeCells), this.gridFadeCells.subscribe(function (a) {
                    t.Chart.gridFadeCells = pd.toBoolean(a, t.Chart.gridFadeCells), e.Metric.gridFadeCells(t.Chart.gridFadeCells);
                }), this.gridCellGap = ko.observable(t.Chart.gridCellGap), this.gridCellGap.subscribe(function (e) {
                    t.Chart.gridCellGap = pd.toNumber(e, t.Chart.gridCellGap), t.Chart.gridCellGap = pd.constrainTo(t.Chart.gridCellGap, 0, 10),
                        i.set({
                            gridCellGap: t.Chart.gridCellGap
                        });
                }), this.showDryBulb = ko.observable(t.Chart.showDryBulb), this.showDryBulb.subscribe(function (e) {
                    t.Chart.showDryBulb = pd.toBoolean(e, t.Chart.showDryBulb), i.set({
                        showDryBulb: t.Chart.showDryBulb
                    });
                }), this.showAbsHumidity = ko.observable(t.Chart.showAbsHumidity), this.showAbsHumidity.subscribe(function (e) {
                    t.Chart.showAbsHumidity = pd.toBoolean(e, t.Chart.showAbsHumidity), i.set({
                        showAbsHumidity: t.Chart.showAbsHumidity
                    });
                }), this.showRelHumidity = ko.observable(t.Chart.showRelHumidity), this.showRelHumidity.subscribe(function (e) {
                    t.Chart.showRelHumidity = pd.toBoolean(e, t.Chart.showRelHumidity), i.set({
                        showRelHumidity: t.Chart.showRelHumidity
                    });
                }), this.showWetBulb = ko.observable(t.Chart.showWetBulb), this.showWetBulb.subscribe(function (e) {
                    t.Chart.showWetBulb = pd.toBoolean(e, t.Chart.showWetBulb), i.set({
                        showWetBulb: t.Chart.showWetBulb
                    });
                }), this.showVapPressure = ko.observable(t.Chart.showVapPressure), this.showVapPressure.subscribe(function (e) {
                    t.Chart.showVapPressure = pd.toBoolean(e, t.Chart.showVapPressure), i.set({
                        showVapPressure: t.Chart.showVapPressure
                    });
                }), this.showAirVolume = ko.observable(t.Chart.showAirVolume), this.showAirVolume.subscribe(function (e) {
                    t.Chart.showAirVolume = pd.toBoolean(e, t.Chart.showAirVolume), i.set({
                        showAirVolume: t.Chart.showAirVolume
                    });
                }), this.showEnthalpy = ko.observable(t.Chart.showEnthalpy), this.showEnthalpy.subscribe(function (e) {
                    t.Chart.showEnthalpy = pd.toBoolean(e, t.Chart.showEnthalpy), i.set({
                        showEnthalpy: t.Chart.showEnthalpy
                    });
                }), this.showLinesUndo = ko.computed({
                    read: function () {
                        return [a.showDryBulb(), a.showAbsHumidity(), a.showRelHumidity(), a.showWetBulb(), a.showVapPressure(), a.showAirVolume(), a.showEnthalpy()];
                    },
                    write: function (e) {
                        pd.isArray(e) && e.length > 6 && (a.showDryBulb(e[0]), a.showAbsHumidity(e[1]),
                            a.showRelHumidity(e[2]), a.showWetBulb(e[3]), a.showVapPressure(e[4]), a.showAirVolume(e[5]),
                            a.showEnthalpy(e[6]));
                    },
                    owner: a
                }), this.showNone = function () {
                    a.showDryBulb(!1), a.showAbsHumidity(!1), a.showRelHumidity(!1), a.showWetBulb(!1),
                        a.showVapPressure(!1), a.showAirVolume(!1), a.showEnthalpy(!1), a.lineHilite(0);
                }, this.showDefault = function () {
                    a.showDryBulb(!0), a.showAbsHumidity(!0), a.showRelHumidity(!0), a.showWetBulb(!1),
                        a.showVapPressure(!1), a.showAirVolume(!1), a.showEnthalpy(!1), a.lineHilite(0);
                };
                var o = null;

                function u() {
                    a.lineHilite(0), o = null;
                }

                this.lineHilite = ko.observable(t.Chart.lineHilite), this.lineHilite.subscribe(function (e) {
                    t.Chart.lineHilite = pd.toInteger(e, t.Chart.lineHilite), t.Chart.lineHilite = pd.constrainTo(t.Chart.lineHilite, -5, 100),
                        i.set({
                            lineHilite: t.Chart.lineHilite
                        }), null != o && (clearTimeout(o), o = null), 0 != t.Chart.lineHilite && (o = setTimeout(u, 7500));
                }), this.highlight = function (e) {
                    a.lineHilite() == e && (e = 0), a.lineHilite(e);
                }, this.infoOverlay = ko.observable(t.Chart.infoOverlay), this.infoOverlay.subscribe(function (e) {
                    t.Chart.infoOverlay = pd.toInteger(e, t.Chart.infoOverlay), t.Chart.infoOverlay = pd.constrainTo(t.Chart.infoOverlay, 0, 10),
                        i.set({
                            infoOverlay: t.Chart.infoOverlay
                        });
                }), this.dataOverlay = ko.observable(t.Chart.dataOverlay), this.dataOverlay.subscribe(function (o) {
                    var n = t.Chart.dataOverlay;
                    t.Chart.dataOverlay = pd.toInteger(o, t.Chart.dataOverlay), t.Chart.dataOverlay = pd.constrainTo(t.Chart.dataOverlay, 0, 10),
                        4 == t.Chart.dataOverlay ? d(t.DateTimeRange.fromDay, t.DateTimeRange.fromDay) : 4 != n || e.Metric.showSelector() || (l.setRange(0, s.Chart.maxDayIndex()),
                            e.Metric.toDay(s.Chart.maxDayIndex()), e.Metric.fromDay(0)), t.Chart.dataOverlay > 0 && e.Metric.dataOverlay(t.Chart.dataOverlay),
                        a.dataOverlay.undoIgnore || (t.Chart.dataOverlay > 0 ? r.trigger() : i.set({
                            dataOverlay: t.Chart.dataOverlay
                        }));
                }), this.processOverlay = ko.observable(t.Chart.processOverlay), this.processOverlay.subscribe(function (e) {
                    t.Chart.processOverlay = pd.toInteger(e, t.Chart.processOverlay), t.Chart.processOverlay = pd.constrainTo(t.Chart.processOverlay, 0, 255),
                        i.set({
                            processOverlay: t.Chart.processOverlay
                        });
                }), this.showComfortGrid = ko.observable(t.Chart.showComfortGrid), this.showComfortGrid.subscribe(function (e) {
                    t.Chart.showComfortGrid = pd.toBoolean(e, t.Chart.showComfortGrid), i.set({
                        showComfortGrid: t.Chart.showComfortGrid
                    });
                }), this.showComfortGridText = ko.computed(function () {
                    var e = a.infoOverlay();
                    return 2 == e || 3 == e ? "Show Underlying Data Grid" : "Show Predicted Mean Vote";
                }, this), this.showIndicator = ko.observable(t.Chart.showIndicator), this.showIndicator.subscribe(function (e) {
                    t.Chart.showIndicator = pd.toBoolean(e, t.Chart.showIndicator), i.set({
                        showIndicator: t.Chart.showIndicator
                    });
                }), this.paddingTop = ko.observable(t.Chart.paddingTop), this.paddingTop.subscribe(function (e) {
                    t.Chart.paddingTop = pd.toInteger(e, t.Chart.paddingTop), t.Chart.paddingTop = pd.constrainTo(t.Chart.paddingTop, 0, 100),
                        i.set({
                            paddingTop: t.Chart.paddingTop
                        });
                }), this.paddingRight = ko.observable(t.Chart.paddingRight), this.paddingRight.subscribe(function (e) {
                    t.Chart.paddingRight = pd.toInteger(e, t.Chart.paddingRight), t.Chart.paddingRight = pd.constrainTo(t.Chart.paddingRight, 0, 100),
                        i.set({
                            paddingRight: t.Chart.paddingRight
                        }), l.set({
                            paddingRight: t.Chart.paddingRight
                        });
                }), this.paddingBottom = ko.observable(t.Chart.paddingBottom), this.paddingBottom.subscribe(function (e) {
                    t.Chart.paddingBottom = pd.toInteger(e, t.Chart.paddingBottom), t.Chart.paddingBottom = pd.constrainTo(t.Chart.paddingBottom, 0, 100),
                        t.Chart.paddingBottom < 20 ? l.set({
                            extendRange: t.Chart.paddingBottom - 5
                        }) : l.set({
                            extendRange: t.Chart.paddingBottom - 20
                        }), i.set({
                            paddingBottom: t.Chart.paddingBottom
                        });
                }), this.paddingLeft = ko.observable(t.Chart.paddingLeft), this.paddingLeft.subscribe(function (e) {
                    t.Chart.paddingLeft = pd.toInteger(e, t.Chart.paddingLeft), t.Chart.paddingLeft = pd.constrainTo(t.Chart.paddingLeft, 0, 100),
                        i.set({
                            paddingLeft: t.Chart.paddingLeft
                        }), l.set({
                            paddingLeft: t.Chart.paddingLeft
                        });
                }), this.showComfortControls = ko.computed(function () {
                    var e = a.infoOverlay();
                    return e > 2 || 1 == e && a.showComfortGrid;
                }, this), this.dataRegionList = ko.observableArray([]), this.dataRegionIndex = ko.observable(-1),
                    this.dataRegion = ko.observable(null), this.dataRegion.subscribe(function (e) {
                        a.dataRegionsPopupIsOpen() && s.UndoManager.checkForChanges(), pd.isObject(e) && e.color ? (a.dataRegionIndex(a.dataRegionList().indexOf(e)),
                            a.dataRegion_Color(e.color), a.dataRegion_Concavity(e.concavity), a.dataRegion_Name(e.name)) : (a.dataRegionIndex(-1),
                                a.dataRegion_Color(""), a.dataRegion_Concavity(10), a.dataRegion_Name("")), a.dataRegionsPopupIsOpen() && s.UndoManager.storeValues(s.Chart.dataRegionUndoChanges);
                    }), this.dataRegion_isValid = ko.computed(function () {
                        return null != a.dataRegion();
                    }, this), this.dataRegionCanMoveUp = ko.computed(function () {
                        return null != a.dataRegion() && a.dataRegionIndex() > 0;
                    }, this), this.dataRegionMoveUp = function () {
                        var e = a.dataRegion(), t = a.dataRegionIndex();
                        if (t > 0) {
                            var r = a.dataRegionList()[t - 1];
                            a.dataRegionList()[t - 1] = a.dataRegionList()[t], a.dataRegionList()[t] = r, a.dataRegionIndex(a.dataRegionList().indexOf(e)),
                                a.dataRegionList.valueHasMutated(), i.redraw();
                        }
                    }, this.dataRegionCanMoveDown = ko.computed(function () {
                        return null != a.dataRegion() && a.dataRegionIndex() < a.dataRegionList().length - 1;
                    }, this), this.dataRegionMoveDown = function () {
                        var e = a.dataRegion(), t = a.dataRegionIndex(), r = a.dataRegionList().length;
                        if (t < r - 1) {
                            var o = a.dataRegionList()[t + 1];
                            a.dataRegionList()[t + 1] = a.dataRegionList()[t], a.dataRegionList()[t] = o, a.dataRegionIndex(a.dataRegionList().indexOf(e)),
                                a.dataRegionList.valueHasMutated(), i.redraw();
                        }
                    };
                var b = new pdDOM.ThrottledUpdate(function () {
                    var e = a.dataRegion();
                    if (e && e.outline) {
                        var t = !pd.closeTo(e.concavity, a.dataRegion_Concavity());
                        e.concavity = a.dataRegion_Concavity();
                        var r = e.color != a.dataRegion_Color();
                        e.color = a.dataRegion_Color(), e.name != a.dataRegion_Name() && (e.name = a.dataRegion_Name(),
                            e.observableName(e.name), r = !0), t && pd.isArray(e.points) && e.points.length > 1 && (e.outline = hull(e.points, Math.max(1, e.concavity), [".dbt", ".rel"])),
                            (t || r) && i.redraw();
                    }
                }, 50);

                function f() {
                    b.trigger();
                }

                function v(e) {
                    var t = i.getTemperatureConverter(),
                        a = e.name || "DBT: " + t.fromCelsius(e.dbt).toFixed(2) + t.getAbbrev() + ", REL: " + e.rel.toFixed(2) + "%";
                    e.observableName ? e.observableName(a) : e.observableName = ko.observable(a);
                }

                this.dataRegion_Concavity = ko.observable(20), this.dataRegion_Concavity.subscribe(f),
                    this.dataRegion_Color = ko.observable(""), this.dataRegion_Color.subscribe(f), this.dataRegion_Name = ko.observable(""),
                    this.dataRegion_Name.subscribe(f), this.dataRegionUndoChanges = ko.computed({
                        read: function () {
                            return a.dataRegionIndex() + "," + a.dataRegion_Concavity() + "," + a.dataRegion_Color() + ',"' + a.dataRegion_Name() + '"';
                        },
                        write: function (t) {
                            if (pd.isString(t) && t.length > 0) {
                                var r = pd.parseCSV(t);
                                if (r.length > 3) {
                                    var o = r[0];
                                    if (o >= 0 && o < a.dataRegionList().length) {
                                        var n = a.dataRegionList()[o], s = pd.toNumber(r[1], n.concavity),
                                            l = !pd.closeTo(n.concavity, s), d = n.color != r[2];
                                        n.concavity = s, n.color = r[2], n.name = r[3], n.observableName(n.name), l && pd.isArray(n.points) && n.points.length > 1 && (e.Manager.showWaitingCursor(!0),
                                            n.outline = hull(n.points, Math.max(1, n.concavity), [".dbt", ".rel"]), e.Manager.showWaitingCursor(!1)),
                                            (l || d) && i.redraw();
                                    }
                                }
                            }
                        },
                        owner: a
                    }).extend({
                        deferred: !0
                    }), this.dataRegionCreate = function (r, o, n, s) {
                        var l;
                        if (e.Manager.showWaitingCursor(!0), pd.isArray(r) && r.length > 0) {
                            if (!("dbt" in r[0])) throw new Error("Points must have 'dbt' and 'rel' properties to be located on chart.");
                            l = i.addDataRegion(r, o, n, s);
                        } else if (2 == t.Chart.dataOverlay) l = i.addDataRegionFromPoints(o, n, s); else {
                            var d = e.Metric.selection();
                            if (d && (d.format == c || d.format == h)) {
                                P(d, {
                                    units: "%",
                                    value: 0,
                                    decimals: 1,
                                    max: 100,
                                    min: 0
                                }, !1), l = i.addDataRegion(w, o, n, s);
                            }
                        }
                        l && (l.observableName = ko.observable(l.name)), a.dataRegionList(i.getDataRegions());
                        var u = a.dataRegionList().length - 1;
                        return u >= 0 && a.dataRegion(a.dataRegionList()[u]), i.redraw(), e.Manager.showWaitingCursor(!1),
                            l;
                    }, this.dataRegionSnapshot = function () {
                        a.dataRegionCreate();
                    }, this.dataRegionRemove = function () {
                        var e = a.dataRegionList().indexOf(a.dataRegion());
                        e >= 0 && (a.dataRegionList.splice(e, 1), e < a.dataRegionList().length ? a.dataRegion(a.dataRegionList()[e]) : e > 0 ? a.dataRegion(a.dataRegionList()[e - 1]) : a.dataRegion(null),
                            i.redraw());
                    }, this.dataRegionsClearAll = function () {
                        confirm("Clearing all regions in the current list.\nAre you sure?") && (a.dataRegion(null),
                            a.dataRegionList.removeAll(), i.clearDataRegions(), i.redraw());
                    }, this.dataRegionsPopupIsOpen = ko.observable(!1), this.dataRegionsPopupOpen = function () {
                        var e = $("#btn-regions"), t = $("#popover-regions");
                        pdKO.showPopoverOnElement(t, e, {
                            placement: "right"
                        });
                    }, this.processPointFactory = function (e, t, a, r) {
                        return r || (r = {}), r.name = pd.isString(a) && a.length > 0 ? a : "", r.observableName = ko.observable(""),
                            r.dbt = pd.toNumber(e, 20), r.rel = pd.toNumber(t, 50), v(r), r;
                    }, this.processPointList = ko.observableArray([]), this.processPointIndex = ko.observable(-1),
                    this.processPoint = ko.observable(null), this.processPoint.subscribe(function (e) {
                        pd.isObject(e) ? (i.setActiveProcessPoint(null), a.processPointIndex(a.processPointList().indexOf(e)),
                            a.processPoint_Name(e.name || ""), a.processPoint_DBT(i.getTemperatureConverter().fromCelsius(e.dbt)),
                            a.processPoint_REL(e.rel)) : (a.processPoint_Name(""), a.processPoint_DBT(""), a.processPoint_REL(""));
                    }), this.processPoint_isValid = ko.computed(function () {
                        return null != a.processPoint();
                    }, this), this.processPoint_hasChanged = ko.observable(!1), this.processPointCanMoveUp = ko.computed(function () {
                        return null != a.processPoint() && a.processPointIndex() > 0;
                    }, this), this.processPointMoveUp = function () {
                        var e = a.processPoint(), t = a.processPointIndex();
                        if (t > 0) {
                            var r = a.processPointList()[t - 1];
                            a.processPointList()[t - 1] = a.processPointList()[t], a.processPointList()[t] = r,
                                a.processPointIndex(a.processPointList().indexOf(e)), a.processPointList.valueHasMutated(),
                                i.setActiveProcessPoint(e), i.redraw();
                        }
                    }, this.processPointCanMoveDown = ko.computed(function () {
                        return null != a.processPoint() && a.processPointIndex() < a.processPointList().length - 1;
                    }, this), this.processPointMoveDown = function () {
                        var e = a.processPoint(), t = a.processPointIndex(), r = a.processPointList().length;
                        if (t < r - 1) {
                            var o = a.processPointList()[t + 1];
                            a.processPointList()[t + 1] = a.processPointList()[t], a.processPointList()[t] = o,
                                a.processPointIndex(a.processPointList().indexOf(e)), a.processPointList.valueHasMutated(),
                                i.setActiveProcessPoint(e), i.redraw();
                        }
                    };
                var y = new pdDOM.ThrottledUpdate(function () {
                    var e = a.processPoint();
                    if (null != e) {
                        var t = a.processPoint_Name(), r = i.getTemperatureConverter().toCelsius(a.processPoint_DBT()),
                            o = a.processPoint_REL(), n = !pd.closeTo(e.dbt, r, .01) || !pd.closeTo(e.rel, o, .01);
                        e.dbt = r, e.rel = o, e.name != t && (e.name = t, n = !0);
                        var s = i.getPsychrometrics();
                        s.dbt = r, s.abs = s.calcAbsFromRelHumidity(r, o), s.rel = o, v(e), n && i.redraw();
                    }
                }, 50);

                function C() {
                    y.trigger();
                }

                function M(t, a) {
                    a && (a.conversion ? a.conversion(t) : a(t), !a.undoIgnore && e.NumberEditor.hasSelectableValues() && e.NumberEditor.selectableTitle(e.NumberEditor.selectableDefaultTitle()));
                }

                this.processPoint_Name = ko.observable(""), this.processPoint_Name.subscribe(C),
                    this.processPoint_DBT = ko.observable(0), this.processPoint_DBT.subscribe(C), this.processPoint_REL = ko.observable(0),
                    this.processPoint_REL.subscribe(C), this.processPointCreate = function (t, r, o) {
                        if (t = pd.toNumber(t, e.Comfort.dryBulbTemperature()), r = pd.toNumber(r, e.Comfort.relativeHumidity()),
                            a.processPointList().length > 0) {
                            var n = a.processPointList()[a.processPointList().length - 1];
                            if (n && pd.closeTo(n.dbt, t, .01) && pd.closeTo(n.rel, r, .01)) return null;
                        }
                        var s = a.processPointFactory(t, r, o);
                        a.processPointList(i.getProcessPoints()), a.processPointList.push(s);
                        var l = a.processPointList().length - 1;
                        return l >= 0 && a.processPoint(a.processPointList()[l]), i.redraw(), s;
                    }, this.processPointSnapshot = function () {
                        a.processPointCreate();
                    }, this.processPointRemove = function () {
                        var e = a.processPointList().indexOf(a.processPoint());
                        e >= 0 && (a.processPointList.splice(e, 1), e < a.processPointList().length ? a.processPoint(a.processPointList()[e]) : e > 0 ? a.processPoint(a.processPointList()[e - 1]) : a.processPoint(null),
                            i.redraw());
                    }, this.processPointsClearAll = function () {
                        confirm("Clearing all points in the current list.\nAre you sure?") && (a.processPoint(null),
                            a.processPointList.removeAll(), i.clearProcessPoints(), i.redraw());
                    }, this.processPointsUndoData = ko.observable(null), this.processPointsUndoData.onUndo = function (e) {
                        if (pd.isString(e)) {
                            var t = JSON.parse(e);
                            if (pd.isArray(t)) {
                                for (var r = a.processPoint(), o = a.processPointList(), n = 0, s = t.length; n < s; ++n) n >= o.length && (o[n] = {}),
                                    o[n].name = t[n].name, o[n].dbt = t[n].dbt, o[n].rel = t[n].rel, v(o[n]);
                                o.length = t.length, a.processPoint(r), a.processPointList.valueHasMutated(), i.redraw();
                            }
                        }
                    }, this.processPointsStoreUndoData = function () {
                        for (var e = [], t = a.processPointList(), r = 0, i = t.length; r < i; ++r) e.push({
                            name: t[r].name,
                            dbt: t[r].dbt,
                            rel: t[r].rel
                        });
                        a.processPointsUndoData(JSON.stringify(e));
                    }, this.processPointsPopupOpen = function () {
                        var e = $("#btn-process-pts"), t = $("#popover-process");
                        pdKO.showPopoverOnElement(t, e, {
                            placement: "right"
                        });
                        for (var r = a.processPointList(), o = 0, n = r.length; o < n; ++o) v(r[o]);
                        var s = i.getActiveProcessPoint();
                        a.processPoint(s), s && (i.setActiveProcessPoint(s), a.processPointIndex(a.processPointList().indexOf(s)),
                            a.processPoint_Name(s.name || ""), a.processPoint_DBT(i.getTemperatureConverter().fromCelsius(s.dbt)),
                            a.processPoint_REL(s.rel));
                    }, this.dblclick = function (t, a, r, i, o, n, s, l) {
                        if (!e.NumberEditor.isPopupVisible()) {
                            var d = a.find(".title").text().replace(":", "") || "Value";
                            e.NumberEditor.min(i), e.NumberEditor.max(o), e.NumberEditor.step(n), e.NumberEditor.minor(n),
                                e.NumberEditor.major(s), e.NumberEditor.title("Edit " + d), e.NumberEditor.decimals(1),
                                pd.isArray(r.selectableValues) ? (r.selectableTitle && (d = r.selectableTitle),
                                    e.NumberEditor.selectableDefaultTitle("CHOOSE " + d.toUpperCase()), e.NumberEditor.selectableTitle(e.NumberEditor.selectableDefaultTitle()),
                                    e.NumberEditor.selectableValuesList(r.selectableValues), e.setValueWithoutUndo(e.NumberEditor.selectableValue, null)) : e.NumberEditor.selectableValuesList().length > 0 && e.NumberEditor.selectableValuesList([]),
                                e.setValueWithoutUndo(e.NumberEditor.value, r()), e.NumberEditor.selectableTitle(e.NumberEditor.selectableDefaultTitle()),
                                e.NumberEditor.action(M), e.NumberEditor.payload(r), e.NumberEditor.open(a, "right");
                        }
                    }, this.readProcessPoints = function (t, r) {
                        if (pd.isArray(t)) {
                            var o, n = i.getTemperatureConverter(), s = e.Chart.processPointIndex();
                            if (e.Chart.processPoint(null), e.Chart.processPointList(i.getProcessPoints()),
                                e.Chart.processPointList.removeAll(), i.clearProcessPoints(), pd.isString(r) && r.length) {
                                var l = pdUnits.Temperature.getUnitsFromAbbrev(r);
                                n = new pdUnits.Temperature(l);
                            }
                            for (var d = 0, u = t.length; d < u; ++d) o = e.Chart.processPointFactory(n.toCelsius(t[d].DBT), t[d].REL, t[d].Name),
                                e.Chart.processPointList.push(o);
                            u = a.processPointList().length, s < 0 && s >= u && (s = 0), a.processPoint(a.processPointList()[s]),
                                i.redraw();
                        }
                    }, this.readCSVProcessPoints = function (e) {
                        var t, r = new pdUnits.Temperature(), i = [];
                        pd.isString(e) || pd.isObject(e) && pd.isString(e.result) && (e = e.result);
                        var o = e.match(/[^\r\n]+/g);
                        if (o.length < 2) return window.alert("ERROR: CSV file is invalid or incomplete as it does not contain point data."),
                            !1;
                        if (o.length > 1 && pd.startsWith(o[0], "#PD:ProcessPoints") && (t = pd.parseCSV(o[0])).length > 1) {
                            var n = function (e) {
                                if (e && e.length) {
                                    var t = e.split("[", 2);
                                    if (t.length > 1 && pd.isString(t[1])) {
                                        var a = t[1].split("]", 2);
                                        t[1] = a[0];
                                    }
                                    return [t[0].trim(), t[1].trim()];
                                }
                                return ["", ""];
                            }(t[1]);
                            if (n.length > 1) {
                                var s = pdUnits.Temperature.getUnitsFromAbbrev(n[1]);
                                r.set(s);
                            }
                        }
                        for (var l = 1, d = o.length; l < d; ++l) (t = pd.parseCSV(o[l])).length > 2 && !pd.startsWith(t[0], "#") && i.push({
                            Name: t[0],
                            DBT: r.toCelsius(t[1]),
                            REL: t[2]
                        });
                        a.readProcessPoints(i);
                    }, this.readCSVData = function (t) {
                        if (pd.isString(t) || pd.isObject(t) && pd.isString(t.result) && (t = t.result),
                            !t || !t.length) throw new TypeError("ERROR: CSV file is empty or invalid.");
                        var a = t.match(/[^\r\n]+/g);
                        if (a.length < 8760) return window.alert("ERROR: CSV file is invalid or incomplete as it does not contain a full year of hourly data."),
                            !1;
                        var o, l = "", d = "", u = "", b = [], f = 0, v = 1, y = 1 == s.Manager.importFirstColumn() ? 0 : 1,
                            C = s.Manager.importFirstColumn() - 1, M = null, T = null, D = pd.parseCSV(a[0]);
                        "#PD:DateTimeRange" == D[0] && (D = pd.parseCSV(a[2]), v = 3);
                        for (var x = y, R = D.length; x < R; ++x) {
                            var w = D[x].indexOf("["), P = (l = w > 0 ? D[x].substr(0, w).trim() : D[x].trim()).indexOf(":");
                            (d = P > 0 ? l.substr(P + 1) : l).length > 23 && (d = d.substr(0, 20).trim() + "...");
                            var k = D[x].match(/\[(.*?)\]/);
                            u = k ? k[1] : "", o = {
                                name: l,
                                shortName: d,
                                abbrev: pd.toStringWithLeadingZeros(x, 2),
                                max: -Number.MAX_VALUE,
                                min: Number.MAX_VALUE,
                                format: c,
                                dataMin: 0,
                                dataMax: 1,
                                units: u,
                                step: 1,
                                data: []
                            }, b.push(o), !M && l.toLowerCase().indexOf("outdoor air drybulb temperature") >= 0 && (M = o),
                                !T && l.toLowerCase().indexOf("outdoor air relative humidity") >= 0 && (T = o);
                        }
                        if ((f = b.length) > 0) {
                            var O, A, S, L, H, E, B, F = 0;
                            if (C > 0) for (var x = 0; x < f; ++x) {
                                (A = b[x]).length = 8760;
                                for (var V = 0; V < 8760; ++V) A.data[V] = 0;
                            }
                            for (var N = v, R = a.length; N < R; ++N) if ((D = pd.parseCSV(a[N])).length > f) if (C > 0) {
                                switch (C) {
                                    default:
                                        O = Date.parse(D[0]), !isNaN(O) && O > 0 ? (H = new Date(O), B = H.getHours() + H.getMinutes() / 60,
                                            E = pd.DateTime.getDOY(H.getDate(), H.getMonth(), H.getFullYear()), F = 24 * E + Math.round(B)) : (S = D[0].split(/\s/)).length > 1 && (B = pd.DateTime.parseTimeToDecimalHours(S[1]),
                                                F = Math.round(pd.constrainTo(B, 0, 24)), (L = S[0].split(/[/\s-.]+/)).length > 1 && (E = pd.DateTime.getDOY(+L[1], +L[0] - 1, +L[2] || 2018),
                                                    F += 24 * E));
                                        break;

                                    case 1:
                                        (S = D[0].split(/\s/)).length > 1 && (B = pd.DateTime.parseTimeToDecimalHours(S[1]),
                                            F = Math.round(pd.constrainTo(B, 0, 24)), (L = S[0].split(/[/\s-.]+/)).length > 1 && (E = pd.DateTime.getDOY(+L[0], +L[1] - 1, +L[2] || 2018),
                                                F += 24 * E));
                                }
                                if (F > 0 && F <= 8784) for (var x = 0; x < f; ++x) A = b[x], O = parseFloat(D[x + y]),
                                    A.max < O && (A.max = O), A.min > O && (A.min = O), A.data[F] = O;
                            } else for (var x = 0; x < f; ++x) A = b[x], O = parseFloat(D[x + y]), A.max < O && (A.max = O),
                                A.min > O && (A.min = O), A.data.push(O);
                            e.updateOnChange = !1, e.Metric.filterList.removeAll(), e.Metric.dbtAxisMetricList.removeAll(),
                                e.Metric.relAxisMetricList.removeAll(), e.Metric.list.removeAll();
                            for (var N = 0; N < f; ++N) {
                                (o = b[N]).dataMin = o.min, o.dataMax = o.max, A = o.data;
                                var U = .5 * Math.abs(o.max + o.min), I = Math.max(1e-6, o.max - o.min);
                                o.step = pd.getTickIncrement(I, 10), o.min = pd.snapTo(U - 2 * I + .25 * o.step, o.step),
                                    o.max = pd.snapTo(U + 2 * I - .25 * o.step, o.step), o.step *= .1, o.format = m,
                                    A.length >= 8760 ? o.format = c : A.length >= 365 ? pd.isArray(A[0]) ? 24 == A[0].length && (o.format = h) : o.format = p : 12 == A.length && (pd.isArray(A[0]) || (o.format = g)),
                                    "C" != (u = o.units) && "°C" != u && "degC" != u || (e.Metric.dbtAxisMetricList.push(o),
                                        M || (M = o)), "%" != u && "%RH" != u || (e.Metric.relAxisMetricList.push(o), T || (T = o)),
                                    e.Metric.filterList.push(o), e.Metric.list.push(o);
                            }
                            if (e.Metric.filterMetric(e.Metric.filterList()[0]), M && M.data.length >= 8760) {
                                n.setValuesFromArray(n.annualHourly.tempDryBulb, M.data), e.Metric.dbtAxisMetric(M),
                                    e.Metric.list.unshift({
                                        format: h,
                                        data: n.annualHourly.tempDryBulb,
                                        name: "Temperature/Humidity Distribution",
                                        shortName: "Temp/Humid Dist.",
                                        abbrev: "FRQ",
                                        units: "Hrs",
                                        dataMin: M.dataMin,
                                        dataMax: M.dataMax,
                                        decimals: 0,
                                        min: 0,
                                        max: 1e3,
                                        step: 1
                                    }), n.dayCount < 365 && e.Metric.selectionIndex(0), n.dayCount = n.annualHourly.tempDryBulb.length;
                                var W = pd.snapTo(i.getTemperatureConverter().fromCelsius(0), 5),
                                    G = Math.min(W, pd.snapTo(i.getTemperatureConverter().fromCelsius(M.dataMin) - 2.5, 5)),
                                    G = Math.min(0, pd.snapTo(i.getTemperatureConverter().fromCelsius(M.dataMin) - 2.5, 5)),
                                    _ = pd.snapTo(i.getTemperatureConverter().fromCelsius(M.dataMax) + 2.5, 5);
                                e.Chart.dryBulbMaxConverted() < _ && e.Chart.dryBulbMaxConverted(_), e.Chart.dryBulbMinConverted(G);
                            }
                            if (T && T.data.length >= 8760 && (n.setValuesFromArray(n.annualHourly.relHumidity, T.data),
                                n.dayCount = n.annualHourly.relHumidity.length, e.Metric.relAxisMetric(T)), e.Metric.list().length > 0) {
                                var K = e.Metric.selectionIndex();
                                K = pd.constrainTo(K, 0, e.Metric.list().length - 1), e.Metric.selection(e.Metric.list()[K]);
                            } else e.Metric.selection(null);
                            e.Weather.fileLoaded(!1), e.Manager.dataLoaded(n.dayCount >= 365), e.Metric.initialiseDateRangeData(),
                                e.Metric.updateSelection(!0), i.updateComfort(!0), r.trigger(), setTimeout(function () {
                                    $("#content-data").collapse("show");
                                    $("#content-automate-data").collapse("show");
                                }, 250), e.updateOnChange = !0;
                        }
                    };
            }(), this.Comfort = new function () {
                var a = this;

                function r(e, t) {
                    var a = e.length;
                    t = pd.toNumber(t, 0);
                    for (var r = 0; r < a; ++r) if (t < e[r].bounds) return e[r].name;
                    return e[a - 1].name;
                }

                this.dryBulbTemperature = ko.observable(t.Comfort.dryBulbTemperature), this.dryBulbTemperature.subscribe(function (r) {
                    r = pd.toNumber(r, t.Comfort.dryBulbTemperature), t.Comfort.dryBulbTemperature = pd.constrainTo(r, -50, 100),
                        i.dryBulbTemperature = t.Comfort.dryBulbTemperature, e.updateOnChange && !a.dryBulbTemperature.undoIgnore && M.trigger();
                }), this.dryBulbConverted = ko.computed({
                    read: function () {
                        return i.getTemperatureConverter().fromCelsius(a.dryBulbTemperature());
                    },
                    write: function (e) {
                        a.dryBulbTemperature(i.getTemperatureConverter().toCelsius(e));
                    },
                    owner: a
                }), this.relativeHumidity = ko.observable(t.Comfort.relativeHumidity), this.relativeHumidity.subscribe(function (r) {
                    r = pd.toNumber(r, t.Comfort.relativeHumidity), t.Comfort.relativeHumidity = pd.constrainTo(r, 0, 100),
                        i.relativeHumidity = t.Comfort.relativeHumidity, e.updateOnChange && !a.relativeHumidity.undoIgnore && M.trigger();
                }), this.indicatorPosition = ko.computed({
                    read: function () {
                        return [a.dryBulbTemperature(), a.relativeHumidity()];
                    },
                    write: function (e) {
                        pd.isArray(e) && e.length > 1 && (a.dryBulbTemperature(e[0]), a.relativeHumidity(e[1]));
                    },
                    owner: a
                }).extend({
                    deferred: !0
                }), this.clothingLevel = ko.observable(t.Comfort.clothingLevel), this.clothingLevel.subscribe(function (a) {
                    a = pd.toNumber(a, t.Comfort.clothingLevel), t.Comfort.clothingLevel = pd.constrainTo(a, 0, 4),
                        i.clothingLevel = t.Comfort.clothingLevel, e.updateOnChange && M.trigger();
                }), this.clothingLevel.selectableTitle = "A CLOTHING LEVEL", this.clothingLevel.selectableValues = [{
                    value: 0,
                    bounds: .01,
                    name: "Naked."
                }, {
                    value: .05,
                    bounds: .1,
                    name: "Underpants only."
                }, {
                    value: .15,
                    bounds: .2,
                    name: "Shorts only, no shoes."
                }, {
                    value: .3,
                    bounds: .4,
                    name: "Shorts and T-shirt, no shoes."
                }, {
                    value: .5,
                    bounds: .6,
                    name: "Short skirt, T-shirt, sandals."
                }, {
                    value: .65,
                    bounds: .7,
                    name: "Trousers, business shirt, shoes."
                }, {
                    value: .75,
                    bounds: .8,
                    name: "Medium-length skirt, blouse, shoes."
                }, {
                    value: .85,
                    bounds: .9,
                    name: "Sweat pants, sweatshirt, sneakers."
                }, {
                    value: 1,
                    bounds: 1.1,
                    name: "Business suit or casual with sweater."
                }, {
                    value: 1.15,
                    bounds: 1.2,
                    name: "Medium skirt, blouse, slip, jacket."
                }, {
                    value: 1.3,
                    bounds: 1.4,
                    name: "Trousers, shirt, sweater, jacket."
                }, {
                    value: 1.5,
                    bounds: 1.6,
                    name: "Trousers, shirt, insulating jacket."
                }, {
                    value: 1.8,
                    bounds: 2.1,
                    name: "Fur coat, thick trousers and scarf."
                }, {
                    value: 2.75,
                    bounds: 3.1,
                    name: "Overcoat, beanie, scarf, gloves."
                }, {
                    value: 3.5,
                    bounds: 3.9,
                    name: "Snow gear with hood and gloves."
                }, {
                    value: 4,
                    bounds: 9.99,
                    name: "Full arctic gear with hood."
                }], this.clothingLevelText = ko.computed(function () {
                    return r(a.clothingLevel.selectableValues, a.clothingLevel());
                }, this), this.metabolicRate = ko.observable(t.Comfort.metabolicRate), this.metabolicRate.subscribe(function (a) {
                    a = pd.toNumber(a, t.Comfort.metabolicRate), t.Comfort.metabolicRate = pd.constrainTo(a, 0, 4),
                        i.metabolicRate = t.Comfort.metabolicRate, e.updateOnChange && M.trigger();
                }), this.metabolicRate.selectableTitle = "AN ACTVITY LEVEL", this.metabolicRate.selectableValues = [{
                    value: 0,
                    bounds: .01,
                    name: "Death."
                }, {
                    value: .2,
                    bounds: .25,
                    name: "Approaching death."
                }, {
                    value: .4,
                    bounds: .45,
                    name: "Sleeping or in coma."
                }, {
                    value: .6,
                    bounds: .65,
                    name: "Resting or snoozing."
                }, {
                    value: .75,
                    bounds: .85,
                    name: "Reclining and relaxed."
                }, {
                    value: .9,
                    bounds: 1,
                    name: "Seated and relaxed."
                }, {
                    value: 1,
                    bounds: 1.15,
                    name: "Seated with sedentary activity."
                }, {
                    value: 1.2,
                    bounds: 1.25,
                    name: "Standing and relaxed."
                }, {
                    value: 1.4,
                    bounds: 1.45,
                    name: "Seated with light activity."
                }, {
                    value: 1.6,
                    bounds: 1.65,
                    name: "Standing with light activity."
                }, {
                    value: 1.8,
                    bounds: 1.95,
                    name: "Slow Walking on flat surface."
                }, {
                    value: 2.2,
                    bounds: 2.55,
                    name: "Standing with medium activity."
                }, {
                    value: 2.6,
                    bounds: 3.05,
                    name: "Brisk walking on flat surface."
                }, {
                    value: 3,
                    bounds: 3.25,
                    name: "Fast walking or inclined surface."
                }, {
                    value: 3.4,
                    bounds: 3.55,
                    name: "Dancing or aerobic activity."
                }, {
                    value: 3.8,
                    bounds: 3.99,
                    name: "Running or heavy lifting."
                }, {
                    value: 4,
                    bounds: 5,
                    name: "Anaerobic activity or intense sport."
                }], this.metabolicRateText = ko.computed(function () {
                    return r(a.metabolicRate.selectableValues, a.metabolicRate());
                }, this), this.externalWork = ko.observable(t.Comfort.externalWork), this.externalWork.subscribe(function (a) {
                    a = pd.toNumber(a, t.Comfort.externalWork), t.Comfort.externalWork = pd.constrainTo(a, 0, 4),
                        i.externalWork = t.Comfort.externalWork, e.updateOnChange && M.trigger();
                }), this.meanRadiantTemperature = ko.observable(t.Comfort.meanRadiantTemperature),
                    this.meanRadiantTemperature.subscribe(function (a) {
                        a = pd.toNumber(a, t.Comfort.meanRadiantTemperature), t.Comfort.meanRadiantTemperature = pd.constrainTo(a, -50, 100),
                            i.meanRadiantTemperature = t.Comfort.meanRadiantTemperature, e.updateOnChange && M.trigger();
                    }), this.meanRadiantConverted = ko.computed({
                        read: function () {
                            return i.getTemperatureConverter().fromCelsius(a.meanRadiantTemperature());
                        },
                        write: function (e) {
                            a.meanRadiantTemperature(i.getTemperatureConverter().toCelsius(e));
                        },
                        owner: a
                    }), this.meanRadiantConverted.selectableTitle = "A RADIANT CONDITION", this.meanRadiantConverted.selectableValues = [{
                        value: -20,
                        bounds: -19.9,
                        name: "Cryogenic chamber."
                    }, {
                        value: -10,
                        bounds: -5,
                        name: "Freezer storage room."
                    }, {
                        value: 0,
                        bounds: 5,
                        name: "Refrigerated room."
                    }, {
                        value: 5,
                        bounds: 10,
                        name: "Cool room or wine store."
                    }, {
                        value: 12,
                        bounds: 15,
                        name: "Unheated space in winter."
                    }, {
                        value: 16,
                        bounds: 18,
                        name: "Conditioned or cool space."
                    }, {
                        value: 22,
                        bounds: 25,
                        name: "Normal room temperature."
                    }, {
                        value: 28,
                        bounds: 32,
                        name: "Warm space in summer."
                    }, {
                        value: 36,
                        bounds: 40,
                        name: "Very hot environment."
                    }, {
                        value: 45,
                        bounds: 50,
                        name: "Uninhabitably hot space."
                    }, {
                        value: 70,
                        bounds: 100,
                        name: "Industrial or smelting furnace."
                    }], this.meanRadiantConverted.convert = function (e) {
                        return i.getTemperatureConverter().fromCelsius(e);
                    }, this.meanRadiantTemperatureText = ko.computed(function () {
                        return r(a.meanRadiantConverted.selectableValues, a.meanRadiantTemperature());
                    }, this), this.airVelocity = ko.observable(t.Comfort.airVelocity), this.airVelocity.subscribe(function (a) {
                        a = pd.toNumber(a, t.Comfort.airVelocity), t.Comfort.airVelocity = pd.constrainTo(a, 0, 2),
                            i.airVelocity = t.Comfort.airVelocity, e.updateOnChange && M.trigger();
                    }), this.airVelocityConverted = ko.computed({
                        read: function () {
                            return i.getVelocityConverter().fromMetersPerSecond(a.airVelocity());
                        },
                        write: function (e) {
                            a.airVelocity(i.getVelocityConverter().toMetersPerSecond(e));
                        },
                        owner: a
                    }), this.airVelocityConverted.selectableTitle = "AN AIR VELOCITY", this.airVelocityConverted.selectableValues = [{
                        value: 0,
                        bounds: .009,
                        name: "Too still, possibly stuffy."
                    }, {
                        value: .1,
                        bounds: .251,
                        name: "Unnoticeably still."
                    }, {
                        value: .3,
                        bounds: .501,
                        name: "Pleasantly still."
                    }, {
                        value: .75,
                        bounds: 1.001,
                        name: "Pleasant but noticeable."
                    }, {
                        value: 1.25,
                        bounds: 1.501,
                        name: "Slightly draughty."
                    }, {
                        value: 1.75,
                        bounds: 1.999,
                        name: "Noticeably draughty."
                    }, {
                        value: 2,
                        bounds: 9.999,
                        name: "Unpleasantly draughty."
                    }], this.airVelocityConverted.convert = function (e) {
                        return i.getVelocityConverter().fromMetersPerSecond(e);
                    }, this.airVelocityText = ko.computed(function () {
                        return r(a.airVelocityConverted.selectableValues, a.airVelocity());
                    }, this), this.meanOutdoorTemperature = ko.observable(t.Comfort.meanOutdoorTemperature),
                    this.meanOutdoorTemperature.subscribe(function (a) {
                        a = pd.toNumber(a, t.Comfort.meanOutdoorTemperature), t.Comfort.meanOutdoorTemperature = pd.constrainTo(a, -50, 100),
                            i.meanOutdoorTemperature = t.Comfort.meanOutdoorTemperature, e.updateOnChange && M.trigger();
                    }), this.meanOutdoorConverted = ko.computed({
                        read: function () {
                            return i.getTemperatureConverter().fromCelsius(a.meanOutdoorTemperature());
                        },
                        write: function (e) {
                            a.meanOutdoorTemperature(i.getTemperatureConverter().toCelsius(e));
                        },
                        owner: a
                    }), this.thermalMassEfficacy = ko.observable(t.Comfort.thermalMassEfficacy), this.thermalMassEfficacy.subscribe(function (a) {
                        a = pd.toNumber(a, t.Comfort.thermalMassEfficacy), t.Comfort.thermalMassEfficacy = pd.constrainTo(a, 0, 1),
                            i.thermalMassEfficacy = t.Comfort.thermalMassEfficacy, e.updateOnChange && M.trigger();
                    }), this.solarGainsEfficacy = ko.observable(t.Comfort.solarGainsEfficacy), this.solarGainsEfficacy.subscribe(function (a) {
                        a = pd.toNumber(a, t.Comfort.solarGainsEfficacy), t.Comfort.solarGainsEfficacy = pd.constrainTo(a, 0, 1),
                            i.solarGainsEfficacy = t.Comfort.solarGainsEfficacy, e.updateOnChange && M.trigger();
                    }), this.internalHeatGains = ko.observable(t.Comfort.internalHeatGains), this.internalHeatGains.subscribe(function (a) {
                        a = pd.toNumber(a, t.Comfort.internalHeatGains), t.Comfort.internalHeatGains = pd.constrainTo(a, 0, 1),
                            i.internalHeatGains = t.Comfort.internalHeatGains, e.updateOnChange && M.trigger();
                    }), this.solarExposure = ko.observable(t.Comfort.solarExposure), this.solarExposure.subscribe(function (a) {
                        a = pd.toNumber(a, t.Comfort.solarExposure), t.Comfort.solarExposure = pd.constrainTo(a, 0, 1),
                            i.solarExposure = t.Comfort.solarExposure, e.updateOnChange && M.trigger();
                    }), this.solarExposure.selectableTitle = "A SOLAR EXPOSURE", this.solarExposure.selectableValues = [{
                        value: 0,
                        bounds: .009,
                        name: "Completely shaded or no Sun."
                    }, {
                        value: .05,
                        bounds: .099,
                        name: "Completely shaded, indirect Sun."
                    }, {
                        value: .15,
                        bounds: .199,
                        name: "Mostly shaded, limited direct Sun."
                    }, {
                        value: .25,
                        bounds: .299,
                        name: "Mostly shaded, direct winter Sun."
                    }, {
                        value: .35,
                        bounds: .399,
                        name: "Mostly shaded, direct summer Sun."
                    }, {
                        value: .45,
                        bounds: .499,
                        name: "Some shading, limited direct Sun."
                    }, {
                        value: .55,
                        bounds: .599,
                        name: "Some shading, direct winter Sun."
                    }, {
                        value: .65,
                        bounds: .699,
                        name: "Some shading, direct summer Sun."
                    }, {
                        value: .75,
                        bounds: .799,
                        name: "No shade, limited direct Sun."
                    }, {
                        value: .85,
                        bounds: .899,
                        name: "No shade, direct winter Sun."
                    }, {
                        value: .95,
                        bounds: .999,
                        name: "No shade, direct summer Sun."
                    }, {
                        value: 1,
                        bounds: 1.001,
                        name: "No shade, very sunny."
                    }], this.solarExposureText = ko.computed(function () {
                        return r(a.solarExposure.selectableValues, a.solarExposure());
                    }, this), this.trackTemperature = ko.observable(t.Comfort.trackTemperature), this.trackTemperature.subscribe(function (e) {
                        t.Comfort.trackTemperature = pd.toBoolean(e, t.Comfort.trackTemperature);
                    }), this.predictCLO = ko.observable(t.Comfort.predictCLO), this.predictCLO.subscribe(function (e) {
                        t.Comfort.predictCLO = pd.toBoolean(e, t.Comfort.predictCLO), a.clothingLevel(i.clothingLevel);
                    }), this.percentageInComfort = ko.observable(t.Comfort.percentageInComfort), this.percentageInComfort.subscribe(function (e) {
                        t.Comfort.percentageInComfort = e.percentageInComfort;
                    }), this.reset = function () {
                        e.updateOnChange = !1, a.clothingLevel(1), a.metabolicRate(1), a.externalWork(0),
                            a.meanRadiantTemperature(20), a.airVelocity(.2), a.meanOutdoorTemperature(19), a.thermalMassEfficacy(.5),
                            a.solarGainsEfficacy(.5), a.internalHeatGains(.5), a.solarExposure(0), e.updateOnChange = !0,
                            M.trigger();
                    }, this.summaryReport = ko.observable(""), this.openOptionsPopup = function () {
                        var e = $("#btn-comf-opts"), a = $("#popover-comfort");
                        !function () {
                            var e = "NO DATA AVAILABLE";
                            if (i && n && s.Metric.filterMetric()) {
                                var a, r, o = {}, l = i.getComfortReportCallback(o),
                                    d = n.getMetric(pdWeather.Metric.DRY_BULB).data,
                                    u = n.getMetric(pdWeather.Metric.REL_HUMIDITY).data, m = d.length,
                                    h = t.DateTimeRange.fromDay, c = t.DateTimeRange.toDay,
                                    p = Math.floor(pd.toNumber(t.DateTimeRange.fromTime, 0)),
                                    g = Math.floor(pd.toNumber(t.DateTimeRange.toTime, 0)),
                                    b = h % 7 + t.DateTimeRange.startDayOfWeek, C = t.DateTimeRange.dayFilter,
                                    M = s.Metric.filterOp(), T = s.Metric.filterLower(), D = s.Metric.filterUpper(),
                                    R = s.Metric.filterMetric().data, w = null;
                                switch (M) {
                                    case 1:
                                        w = f;
                                        break;

                                    case 2:
                                        w = v;
                                        break;

                                    case 3:
                                        w = y;
                                }
                                if (c < h && (c += n.dayCount), c - h >= n.dayCount && (c = h + n.dayCount - 1),
                                    g <= p && (g += 24), g - p > 24 && (g = p + 24), l) for (var P = h; P <= c; ++P) {
                                        if (a = P >= m ? P - m : P, C & x[b]) for (var k = p; k < g; ++k) r = k >= 24 ? k - 24 : k,
                                            w && !w(R[a][r], T, D) || l(d[a][r], u[a][r], o);
                                        ++b > 6 && (b = 0);
                                    }
                                switch (s.Chart.infoOverlay()) {
                                    default:
                                        e = "NO COMFORT OVERLAY SELECTED";
                                        break;

                                    case 1:
                                        e = "Givoni Bioclimatic Chart\n", e += "Points in Comfort: " + o.pointCount + "\n",
                                            e += "Percentage in Comfort: " + (o.pointCount / o.pointTotal * 100).toFixed(2) + "%\n",
                                            e += "Points Displayed: " + o.pointTotal + "\n";
                                        t.Comfort.percentageInComfort = (o.pointCount / o.pointTotal * 100).toFixed(2)
                                        t.Comfort.listOfComfortPoints = o.listOfComfortPoints;
                                        break;

                                    case 2:
                                        e = "Outdoor Work Heat Index\n", o.pointTotal > 0 && (e += "OKAY: " + (o.band[0] / o.pointTotal * 100).toFixed(2) + "% / " + o.band[0] + " pts\n",
                                            e += "CAUTION: " + (o.band[1] / o.pointTotal * 100).toFixed(2) + "% / " + o.band[1] + " pts\n",
                                            e += "EXTREME CAUTION: " + (o.band[2] / o.pointTotal * 100).toFixed(2) + "% / " + o.band[2] + " pts\n",
                                            e += "DANGER: " + (o.band[3] / o.pointTotal * 100).toFixed(2) + "% / " + o.band[3] + " pts\n",
                                            e += "EXTREME DANGER: " + (o.band[4] / o.pointTotal * 100).toFixed(2) + "% / " + o.band[4] + " pts\n"),
                                            e += "Points Displayed: " + o.pointTotal + "\n";
                                        break;

                                    case 3:
                                        e = "ISO 7730:2005 (PMV)\n", o.pointTotal > 0 && (e += "COLD: " + (o.band[0] / o.pointTotal * 100).toFixed(2) + "% / " + o.band[0] + " pts\n",
                                            e += "COOL: " + (o.band[1] / o.pointTotal * 100).toFixed(2) + "% / " + o.band[1] + " pts\n",
                                            e += "SLIGHTLY COOL: " + (o.band[2] / o.pointTotal * 100).toFixed(2) + "% / " + o.band[2] + " pts\n",
                                            e += "NEUTRAL: " + (o.band[3] / o.pointTotal * 100).toFixed(2) + "% / " + o.band[3] + " pts\n",
                                            e += "SLIGHTLY WARM: " + (o.band[4] / o.pointTotal * 100).toFixed(2) + "% / " + o.band[4] + " pts\n",
                                            e += "WARM: " + (o.band[5] / o.pointTotal * 100).toFixed(2) + "% / " + o.band[5] + " pts\n",
                                            e += "HOT: " + (o.band[6] / o.pointTotal * 100).toFixed(2) + "% / " + o.band[6] + " pts\n"),
                                            e += "Points Displayed: " + o.pointTotal + "\n";
                                        break;

                                    case 4:
                                        e = "ASHRAE 55-2017\n", o.pointTotal > 0 && (e += "Points in Comfort: " + o.pointCount + "\n",
                                            e += "Percentage in Comfort: " + (o.pointCount / o.pointTotal * 100).toFixed(2) + "%\n"),
                                            e += "Points Displayed: " + o.pointTotal + "\n";
                                        break;

                                    case 5:
                                        e = "EN 15251:2007\n", o.pointTotal > 0 && (e += "Category I: " + (o.categoryI / o.pointTotal * 100).toFixed(2) + "% / " + o.categoryI + " pts\n",
                                            e += "Category II: " + (o.categoryII / o.pointTotal * 100).toFixed(2) + "% / " + o.categoryII + " pts\n",
                                            e += "Category III: " + (o.categoryIII / o.pointTotal * 100).toFixed(2) + "% / " + o.categoryIII + " pts\n",
                                            e += "Category IV: " + (o.categoryIV / o.pointTotal * 100).toFixed(2) + "% / " + o.categoryIV + " pts\n"),
                                            e += "Points Displayed: " + o.pointTotal + "\n";
                                }
                            }
                            s.Comfort.summaryReport(e);
                        }(), pdKO.showPopoverOnElement(a, e, {
                            placement: "right",
                            $target: e
                        });
                    };
            }(), this.Manager = new function () {
                var o = this;

                function l(e) {
                    var a = "";
                    return 0 == e ? (a += "{\n", a += '  "DateTimeRange": {\n', a += '    "fromDay": ' + t.DateTimeRange.fromDay + ",\n",
                        a += '    "toDay": ' + t.DateTimeRange.toDay + ",\n", a += '    "fromTime": ' + t.DateTimeRange.fromTime + ",\n",
                        a += '    "toTime": ' + t.DateTimeRange.toTime + ",\n", a += '    "startDayOfWeek": ' + t.DateTimeRange.startDayOfWeek + ",\n",
                        a += '    "dayFilter": ' + t.DateTimeRange.dayFilter + "\n", a += "  }") : (a += "#PD:DateTimeRange, FromDay, ToDay, FromTime, ToTime, StartDayOfWeek, DayFilter\n",
                            a += t.DateTimeRange.fromDay + ", ", a += t.DateTimeRange.toDay + ", ", a += t.DateTimeRange.fromTime + ", ",
                            a += t.DateTimeRange.toTime + ", ", a += t.DateTimeRange.startDayOfWeek + ", ",
                            a += t.DateTimeRange.dayFilter), a;
                }

                function d(e) {
                    if (e && e.length > 0) {
                        var t = document.createElement("a");
                        return t.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(o.exportText())),
                            t.setAttribute("download", e), t.dispatchEvent(new MouseEvent("click", {
                                bubbles: !0,
                                cancelable: !0,
                                view: window
                            })), !0;
                    }
                    return !1;
                }

                function m(e) {
                    if (e && e.length > 0) {
                        o.formatParamData(!0);
                        var t = o.paramData(), a = document.createElement("a");
                        return a.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(t)),
                            a.setAttribute("download", e), a.dispatchEvent(new MouseEvent("click", {
                                bubbles: !0,
                                cancelable: !0,
                                view: window
                            })), !0;
                    }
                    return !1;
                }

                function p(e) {
                    var t = new Blob([i.getExportableText(!0)], {
                        type: "image/svg+xml;charset=utf-8"
                    }), a = URL.createObjectURL(t), r = document.createElement("a");
                    return r.href = a, r.download = e, document.body.appendChild(r), r.click(), document.body.removeChild(r),
                        !0;
                }

                this.showWaitingCursor = ko.observable(!1), this.dataLoaded = ko.observable(!1),
                    this.dayOfYearVisible = ko.computed(function () {
                        return o.dataLoaded() && e.Comfort.trackTemperature();
                    }, this), this.importText = ko.observable(""), this.importDialogOpen = ko.observable(!1),
                    this.importFirstColumn = ko.observable(0), this.import = function () {
                        var t = o.importText();
                        if (pd.startsWith(t, "{")) {
                            var a = JSON.parse(t), r = "";
                            pd.isArray(a.ProcessPoints) && (pd.isObject(a.PsychrometricUnits) && (r = a.PsychrometricUnits["DryBulbTemperature(DBT)"]),
                                e.Chart.readProcessPoints(a.ProcessPoints, r));
                        } else pd.startsWith(t, "#PD:ProcessPoints,") ? e.Chart.readCSVProcessPoints(t) : e.Chart.readCSVData(t);
                    }, this.setExportText = function () {
                        var a = o.exportData(), r = o.exportFormat();
                        switch (a) {
                            case 0:
                                e.Manager.exportText(function (e) {
                                    var t = "", a = i.getPsychrometrics(), r = i.getTemperatureConverter(),
                                        o = i.getHumidityRatioConverter(), n = i.getPressureConverter(),
                                        s = i.getSpecificVolumeConverter(), l = i.getEnthalpyConverter();
                                    0 == e ? (t += "{\n", t += '  "Psychrometrics": {\n', t += '    "AtmosphericPressure": {\n',
                                        t += '      "value": ' + n.fromKiloPascal(a.atmPressure).toPrecision(7) + ",\n",
                                        t += '      "units": "' + n.getAbbrev() + '"\n', t += "    },\n", t += '    "DryBulbTemperature": {\n',
                                        t += '      "value": ' + r.fromCelsius(a.dryBulb).toFixed(2) + ",\n", t += '      "units": "' + r.getAbbrev(!0) + '"\n',
                                        t += "    },\n", t += '    "RelativeHumidity": {\n', t += '      "value": ' + a.relativeHumidity.toFixed(2) + ",\n",
                                        t += '      "units": "%"\n', t += "    },\n", t += '    "AbsoluteHumidity": {\n',
                                        t += '      "value": ' + o.fromGramsPerKilogram(a.absoluteHumidity).toPrecision(5) + ",\n",
                                        t += '      "units": "' + o.getAbbrev() + '"\n', t += "    },\n", t += '    "WetBulbTemperature": {\n',
                                        t += '      "value": ' + r.fromCelsius(a.wetBulb).toFixed(2) + ",\n", t += '      "units": "' + r.getAbbrev(!0) + '"\n',
                                        t += "    },\n", t += '    "DewPointTemperature": {\n', t += '      "value": ' + r.fromCelsius(a.dewPoint).toFixed(2) + ",\n",
                                        t += '      "units": "' + r.getAbbrev(!0) + '"\n', t += "    },\n", t += '    "VapourPressure": {\n',
                                        t += '      "value": ' + n.fromKiloPascal(a.vapPressure).toFixed(5) + ",\n", t += '      "units": "' + n.getAbbrev() + '"\n',
                                        t += "    },\n", t += '    "AirVolume": {\n', t += '      "value": ' + s.fromCubicMetersPerKilogram(a.airVolume).toFixed(5) + ",\n",
                                        t += '      "units": "' + s.getAbbrev() + '"\n', t += "    },\n", t += '    "Enthalpy": {\n',
                                        t += '      "value": ' + l.fromKiloJoulesPerKilogram(a.enthalpy).toFixed(5) + ",\n",
                                        t += '      "units": "' + l.getAbbrev() + '"\n', t += "    }\n", t += "  }\n", t += "}\n") : (t += "#PD:Psychrometrics, Value, Units\n",
                                            t += "Atmospheric Pressure, " + n.fromKiloPascal(a.atmPressure).toPrecision(7) + ", " + n.getAbbrev() + "\n",
                                            t += "Dry-Bulb Temperature, " + r.fromCelsius(a.dryBulb).toFixed(2) + ", " + r.getAbbrev(!0) + "\n",
                                            t += "Relative Humidity, " + a.relativeHumidity.toFixed(2) + ", %\n", t += "Absolute Humidity, " + o.fromGramsPerKilogram(a.absoluteHumidity).toPrecision(5) + ", " + o.getAbbrev() + "\n",
                                            t += "Wet-Bulb Temperature, " + r.fromCelsius(a.wetBulb).toFixed(2) + ", " + r.getAbbrev(!0) + "\n",
                                            t += "Dew-Point Temperature, " + r.fromCelsius(a.dewPoint).toFixed(2) + ", " + r.getAbbrev(!0) + "\n",
                                            t += "Vapour Pressure, " + n.fromKiloPascal(a.vapPressure).toFixed(5) + ", " + n.getAbbrev() + "\n",
                                            t += "Air Volume, " + s.fromCubicMetersPerKilogram(a.airVolume).toFixed(5) + ", " + s.getAbbrev() + "\n",
                                            t += "Enthalpy, " + l.fromKiloJoulesPerKilogram(a.enthalpy).toFixed(5) + ", " + l.getAbbrev() + "\n");
                                    return t;
                                }(r));
                                break;

                            case 1:
                                t.Chart.dataOverlay <= 1 ? e.Manager.exportText(function (a) {
                                    var r = "", o = e.Metric.selection(), n = i.getTemperatureConverter(),
                                        s = i.getHumidityRatioConverter(), d = i.getDataGrid(), u = n.getAbbrev(!0);
                                    if (d._rows < 1 || d._cols < 1) return "SORRY: No grid data currently available.\nPlease load a .EPW or .CSV data file.";
                                    0 == a ? (r += "{\n", r += '  "GridExtents": {\n', r += '    "dryBulbMin": ' + n.fromCelsius(t.Chart.dryBulbMin).toFixed(2) + ",\n",
                                        r += '    "dryBulbMax": ' + n.fromCelsius(t.Chart.dryBulbMax).toFixed(2) + ",\n",
                                        r += '    "dryBulbUnits": "' + u + '",\n', r += '    "absHumidityMin": ' + s.fromGramsPerKilogram(0).toPrecision(5) + ",\n",
                                        r += '    "absHumidityMax": ' + s.fromGramsPerKilogram(t.Chart.absHumidityMax).toPrecision(5) + ",\n",
                                        r += '    "absHumidityUnits": "' + s.getAbbrev() + '",\n', r += '    "gridVerticalAxis": ' + (t.Chart.gridVerticalAxis < 0 ? t.Chart.verticalAxis : t.Chart.gridVerticalAxis) + ",\n",
                                        r += '    "subTitle": "' + i.subTitle() + '"\n', r += "  },\n", r += l(a) + ",\n",
                                        r += d.toJSON("  ", o.decimals) + "\n", r += "}\n") : (r += "#PD:GridExtents, DrybulbMin [" + u + "], DrybulbMax [" + u + "], AbsHumidityMax [" + s.getAbbrev() + "]\n",
                                            r += (t.Chart.gridVerticalAxis < 0 ? t.Chart.verticalAxis : t.Chart.gridVerticalAxis) + ", ",
                                            r += n.fromCelsius(t.Chart.dryBulbMin).toFixed(2) + ", ", r += n.fromCelsius(t.Chart.dryBulbMax).toFixed(2) + ", ",
                                            r += s.fromGramsPerKilogram(t.Chart.absHumidityMax).toPrecision(5) + "\n", r += l(a) + "\n",
                                            r += d.toCSV(o.decimals));
                                    return r;
                                }(r)) : e.Manager.exportText(function (a) {
                                    var r = "", o = i.getDataPoints(), n = e.Metric.selection(), s = "      ", d = 2;
                                    if (2 != t.Chart.dataOverlay && n && (n.format == c || n.format == h)) {
                                        P(n, {
                                            units: "%",
                                            value: 0,
                                            decimals: 1,
                                            max: 100,
                                            min: 0
                                        }, !1), o = w;
                                    }
                                    var u = o ? o.length : 0;
                                    if (u < 1) return "SORRY: No point data currently available.\nPlease load a .EPW or .CSV data file.";
                                    var m = new pd.Psychrometrics({
                                        atmPressure: i.getPsychrometrics().atmPressure
                                    });
                                    u > 999 ? d = 4 : u > 99 && (d = 3);
                                    if (e.Metric.calculateFrequency()) if (0 == a) {
                                        r += "{\n", r += m.getUnitsJSON("  ") + ",\n", r += l(a) + ",\n", r += '  "DataPoints": [\n';
                                        for (var p = 0; p < u; ++p) r += "    {\n", o[p].name && (r += s + '"Name": "' + o[p].name + '",\n'),
                                            m.setDBTREL(o[p].dbt, o[p].rel), r += m.toJSON(s) + "\n", r += p < u - 1 ? "    },\n" : "    }\n";
                                        r += "  ]\n", r += "}\n";
                                    } else {
                                        r += l(a) + "\n", r += "#DataPoints, ", r += m.getUnitsCSV() + "\n";
                                        for (var p = 0; p < u; ++p) m.setDBTREL(o[p].dbt, o[p].rel), r += pd.toStringWithLeadingZeros(p, d) + ", ",
                                            r += m.toCSV(), o[p].name && (r += ", " + o[p].name), r += "\n";
                                    } else if (n) if (0 == a) {
                                        r += "{\n", r += '  "Metric": {\n', r += (s = "      ") + '"name": "' + n.name + ',"\n',
                                            r += s + '"shortName": "' + n.shortName + '",\n', r += s + '"abbrev": "' + n.abbrev + '",\n',
                                            r += s + '"units": "' + n.units + '",\n', r += s + '"min": ' + e.Metric.resultMin().toFixed(n.decimals) + ",\n",
                                            r += s + '"max": ' + e.Metric.resultMax().toFixed(n.decimals) + "\n", r += "  },\n",
                                            r += l(a) + ",\n", r += '  "DataPoints": [\n';
                                        for (var p = 0; p < u; ++p) r += "    {\n", o[p].name && (r += s + '"Name": "' + o[p].name + '",\n'),
                                            r += s + '"DBT": ' + o[p].dbt.toFixed(2) + ",\n", r += s + '"REL": ' + o[p].rel.toFixed(2) + ",\n",
                                            r += s + '"VAL": ' + o[p].val.toFixed(5) + ",\n", r += p < u - 1 ? "    },\n" : "    }\n";
                                        r += "  ]\n", r += "}\n";
                                    } else {
                                        r += "#PD:MetricName, ShortName, Abbrev, Units, Min, Max, Name\n", r += '"' + n.name + '", ',
                                            r += '"' + n.shortName + '", ', r += '"' + n.abbrev + '", ', r += '"' + n.units + '", ',
                                            r += e.Metric.resultMin().toFixed(n.decimals) + ", ", r += e.Metric.resultMax().toFixed(n.decimals) + "\n",
                                            r += l(a) + "\n", r += "#PD:DataPoints, DBT, REL, VAL\n";
                                        for (var p = 0; p < u; ++p) m.setDBTREL(o[p].dbt, o[p].rel), r += pd.toStringWithLeadingZeros(p, d) + ", ",
                                            r += o[p].dbt.toFixed(2) + ", ", r += o[p].rel.toFixed(2) + ", ", r += o[p].val.toFixed(n.decimals),
                                            o[p].name && (r += ", " + o[p].name), r += "\n";
                                    }
                                    return r;
                                }(r));
                                break;

                            case 2:
                                e.Manager.exportText(function (e) {
                                    var t = "", a = i.getProcessPoints(), r = i.getTemperatureConverter(),
                                        o = i.getHumidityRatioConverter(), n = i.getPressureConverter(),
                                        s = i.getSpecificVolumeConverter(), l = i.getEnthalpyConverter(), d = a ? a.length : 0;
                                    if (d < 1) return "SORRY: No process lines are displayed.";
                                    var u = new pd.Psychrometrics({
                                        atmPressure: i.getPsychrometrics().atmPressure
                                    });
                                    if (0 == e) {
                                        t += "{\n", t += '  "PsychrometricUnits": {\n', t += '    "AtmosphericPressure(ATM)": "' + n.getAbbrev() + '",\n',
                                            t += '    "DryBulbTemperature(DBT)": "' + r.getAbbrev(!0) + '",\n', t += '    "RelativeHumidity(REL)": "%",\n',
                                            t += '    "AbsoluteHumidity(ABS)": "' + o.getAbbrev() + '",\n', t += '    "WetBulbTemperature(WBT)": "' + r.getAbbrev(!0) + '",\n',
                                            t += '    "DewPointTemperature(DEW)": "' + r.getAbbrev(!0) + '",\n', t += '    "VapourPressure(VAP)": "' + n.getAbbrev() + '",\n',
                                            t += '    "AirVolume(VOL)": "' + s.getAbbrev() + '",\n', t += '    "Enthalpy(ENT)": "' + l.getAbbrev() + '",\n',
                                            t += '    "ATM": ' + n.fromKiloPascal(u.atmPressure).toPrecision(7) + "\n", t += "  },\n",
                                            t += '  "ProcessPoints": [\n';
                                        for (var m = 0; m < d; ++m) t += "    {\n", t += '      "Name": "' + a[m].name.toString() + '",\n',
                                            u.setDBTREL(a[m].dbt, a[m].rel), t += '      "DBT": ' + r.fromCelsius(u.dryBulb).toFixed(2) + ",\n",
                                            t += '      "REL": ' + u.relativeHumidity.toFixed(2) + ",\n", t += '      "ABS": ' + o.fromGramsPerKilogram(u.absoluteHumidity).toPrecision(5) + ",\n",
                                            t += '      "WBT": ' + r.fromCelsius(u.wetBulb).toFixed(2) + ",\n", t += '      "DEW": ' + r.fromCelsius(u.dewPoint).toFixed(2) + ",\n",
                                            t += '      "VAP": ' + n.fromKiloPascal(u.vapPressure).toFixed(5) + ",\n", t += '      "VOL": ' + s.fromCubicMetersPerKilogram(u.airVolume).toFixed(5) + ",\n",
                                            t += '      "ENT": ' + l.fromKiloJoulesPerKilogram(u.enthalpy).toFixed(5) + "\n",
                                            t += m < d - 1 ? "    },\n" : "    }\n";
                                        t += "  ]\n", t += "}\n";
                                    } else {
                                        t += "#PD:ProcessPoints, ", t += "Dry-Bulb Temperature [" + r.getAbbrev(!0) + "], ",
                                            t += "Relative Humidity [%], ", t += "Absolute Humidity [" + o.getAbbrev() + "], ",
                                            t += "Wet-Bulb Temperature [" + r.getAbbrev(!0) + "], ", t += "Dew-Point Temperature [" + r.getAbbrev(!0) + "], ",
                                            t += "Vapour Pressure [" + n.getAbbrev() + "], ", t += "Air Volume [" + s.getAbbrev() + "], ",
                                            t += "Enthalpy [" + l.getAbbrev() + "]\n";
                                        for (var m = 0; m < d; ++m) u.setDBTREL(a[m].dbt, a[m].rel), t += '"' + a[m].name.toString() + '", ',
                                            t += r.fromCelsius(u.dryBulb).toFixed(2) + ", ", t += u.relativeHumidity.toFixed(2) + ", ",
                                            t += o.fromGramsPerKilogram(u.absoluteHumidity).toPrecision(5) + ", ", t += r.fromCelsius(u.wetBulb).toFixed(2) + ", ",
                                            t += r.fromCelsius(u.dewPoint).toFixed(2) + ", ", t += n.fromKiloPascal(u.vapPressure).toFixed(5) + ", ",
                                            t += s.fromCubicMetersPerKilogram(u.airVolume).toFixed(5) + ", ", t += l.fromKiloJoulesPerKilogram(u.enthalpy).toFixed(5) + "\n";
                                    }
                                    return t;
                                }(r));
                                break;

                            default:
                                s.Manager.exportText("ADDITIONAL FORMATS:\nIf there is an additional format you would like added here,\nand have the specifications and/or implementation details,\nplease contact me via http://andrewmarsh.com/pages/contact/\nand I will get back to you soon for more details.\n");
                        }
                    }, this.exportText = ko.observable(""), this.exportData = ko.observable(0), this.exportData.subscribe(function () {
                        o.setExportText();
                    }), this.exportFormat = ko.observable(0), this.exportFormat.subscribe(function () {
                        o.setExportText();
                    }), this.exportSuffix = ko.computed(function () {
                        switch (o.exportFormat()) {
                            case 0:
                                return ".json";

                            case 1:
                                return ".csv";

                            default:
                                return ".txt";
                        }
                    }, this), this.showExport = function () {
                        $("#modal-save-controls").hide();
                        var t = o.exportSuffix();
                        e.SaveAs.title("Save Psychrometric Data"), e.SaveAs.message("Enter the filename to save your exported data to:"),
                            e.SaveAs.filename("psychro-chart2d-" + pd.DateTime.generateDateSuffix() + t), e.SaveAs.action(d),
                            e.SaveAs.extension(t), e.SaveAs.open();
                    }, this.paramData = ko.observable("[No settings data available]"), this.paramErrorVisible = !1,
                    this.paramDataChanged = ko.observable(!1), this.paramDataEdited = function () {
                        o.paramDataChanged(!0), o.paramErrorVisible && ($("#modal-data-alert").addClass("hidden"),
                            o.paramErrorVisible = !1);
                    }, this.formatParamData = function (e) {
                        t.updateDataFromModel(), !e && a ? a.setText(JSON.stringify(t, null, "    ")) : o.paramData(JSON.stringify(t, null, "    ")),
                            o.paramDataChanged(!1);
                    }, this.showTextMode = function () {
                        a && ("text" != a.getMode() ? a.setMode("text") : a.setMode("tree"));
                    }, this.shareParamDataAsURI = function () {
                        var e = document.location, r = e.protocol + "//" + e.host + e.pathname,
                            i = S ? a ? a.get() : JSON.parse(o.paramData()) : t, n = r + "?psychroData=" + pdDOM.jsonToURI(i),
                            s = prompt("Opening the following URL in a new browser page will generate the same model and settings:", n);
                        s && s.length > 0 && window.open(n, "_blank");
                    }, this.showSaveSettings = function () {
                        $("#modal-save-controls").hide(), e.SaveAs.title("Save Settings"), e.SaveAs.message("Enter the filename to save your current model settings as:"),
                            e.SaveAs.filename("psychro-chart2d-" + pd.DateTime.generateDateSuffix() + ".json"),
                            e.SaveAs.action(m), e.SaveAs.extension(".json"), e.SaveAs.open();
                    }, this.showSaveSVG = function () {
                        $("#modal-save-controls").hide(), e.SaveAs.title("Save to SVG"), e.SaveAs.message("Enter the filename to save the current chart as:</strong>"),
                            e.SaveAs.filename("psychro-chart2d-" + pd.DateTime.generateDateSuffix() + ".svg"),
                            e.SaveAs.action(p), e.SaveAs.extension(".svg"), e.SaveAs.open();
                    }, this.processParamData = function (a) {
                        t.readAppData(a), e.updateOnChange = !1, e.Chart.dryBulbMin(t.Chart.dryBulbMin),
                            e.Chart.dryBulbMax(t.Chart.dryBulbMax), e.Chart.absHumidityMax(t.Chart.absHumidityMax),
                            e.Chart.atmPressure(t.Chart.atmPressure), e.Chart.legendAlign(t.Chart.legendAlign),
                            e.Chart.verticalAxis(t.Chart.verticalAxis), e.Chart.detailMode(t.Chart.detailMode ? 1 : 0),
                            e.Chart.gridVerticalAxis(t.Chart.gridVerticalAxis), e.Chart.gridFadeCells(t.Chart.gridFadeCells),
                            e.Chart.gridHighRes(t.Chart.gridHighRes), e.Chart.showDryBulb(t.Chart.showDryBulb),
                            e.Chart.showAbsHumidity(t.Chart.showAbsHumidity), e.Chart.showRelHumidity(t.Chart.showRelHumidity),
                            e.Chart.showWetBulb(t.Chart.showWetBulb), e.Chart.showVapPressure(t.Chart.showVapPressure),
                            e.Chart.showAirVolume(t.Chart.showAirVolume), e.Chart.showEnthalpy(t.Chart.showEnthalpy),
                            e.Chart.showComfortGrid(t.Chart.showComfortGrid), e.Chart.showIndicator(t.Chart.showIndicator),
                            e.Chart.lineHilite(t.Chart.lineHilite), e.Chart.infoOverlay(t.Chart.infoOverlay),
                            e.Chart.dataOverlay(t.Chart.dataOverlay), e.Chart.processOverlay(t.Chart.processOverlay),
                            e.Chart.paddingTop(t.Chart.paddingTop), e.Chart.paddingRight(t.Chart.paddingRight),
                            e.Chart.paddingBottom(t.Chart.paddingBottom), e.Chart.paddingLeft(t.Chart.paddingLeft),
                            e.Metric.dayFilter[0](1 & t.DateTimeRange.dayFilter), e.Metric.dayFilter[1](2 & t.DateTimeRange.dayFilter),
                            e.Metric.dayFilter[2](4 & t.DateTimeRange.dayFilter), e.Metric.dayFilter[3](8 & t.DateTimeRange.dayFilter),
                            e.Metric.dayFilter[4](16 & t.DateTimeRange.dayFilter), e.Metric.dayFilter[5](32 & t.DateTimeRange.dayFilter),
                            e.Metric.dayFilter[6](64 & t.DateTimeRange.dayFilter), e.Metric.dateRangeStart().setDOY(t.DateTimeRange.fromDay),
                            e.Metric.dateRangeEnd().setDOY(t.DateTimeRange.toDay), e.Metric.fromTime(Math.floor(t.DateTimeRange.fromTime)),
                            e.Metric.toTime(Math.floor(t.DateTimeRange.fromTime)), e.Metric.startDayOfWeek(t.DateTimeRange.startDayOfWeek),
                            e.Metric.showSelector(t.DateTimeRange.showSelector), e.Comfort.dryBulbTemperature(t.Comfort.dryBulbTemperature),
                            e.Comfort.relativeHumidity(t.Comfort.relativeHumidity), e.Comfort.clothingLevel(t.Comfort.clothingLevel),
                            e.Comfort.metabolicRate(t.Comfort.metabolicRate), e.Comfort.externalWork(t.Comfort.externalWork),
                            e.Comfort.meanRadiantTemperature(t.Comfort.meanRadiantTemperature), e.Comfort.airVelocity(t.Comfort.airVelocity),
                            e.Comfort.meanOutdoorTemperature(t.Comfort.meanOutdoorTemperature), e.Comfort.thermalMassEfficacy(t.Comfort.thermalMassEfficacy),
                            e.Comfort.solarGainsEfficacy(t.Comfort.solarGainsEfficacy), e.Comfort.internalHeatGains(t.Comfort.internalHeatGains),
                            e.Comfort.solarExposure(t.Comfort.solarExposure), e.Comfort.trackTemperature(t.Comfort.trackTemperature),
                            e.Comfort.predictCLO(t.Comfort.predictCLO), u(), e.DisplayUnits.temperature(t.DisplayUnits.temperature),
                            e.DisplayUnits.humidity(t.DisplayUnits.humidity), e.DisplayUnits.pressure(t.DisplayUnits.pressure),
                            e.DisplayUnits.volume(t.DisplayUnits.volume), e.DisplayUnits.enthalpy(t.DisplayUnits.enthalpy),
                            e.DisplayUnits.velocity(t.DisplayUnits.velocity), e.updateOnChange = !0, r.trigger();
                    }, this.parseParamData = function () {
                        try {
                            var e = a ? a.get() : JSON.parse(o.paramData());
                            o.processParamData(e), $("#modal-data").modal("hide");
                        } catch (e) {
                            var t = e.message || "Editor contains invalid JSON data.";
                            null != S ? ($("#modal-data-error").html(t), $("#modal-data-alert").removeClass("hidden"),
                                o.paramErrorVisible = !0) : window.alert("ERROR: " + t);
                        }
                    }, this.selectFile = function (e) {
                        var t = document.getElementById("modal-data-file");
                        e && e.length > 0 && (t.accept = e);
                        try {
                            t.value = null, t.value && (t.type = "text", t.type = "file");
                        } catch (e) {
                        }
                        t.click();
                    }, this.exportToExcel = function (data, filename) {
                        // Create a new workbook
                        var workbook = XLSX.utils.book_new();

                        // Convert the data to a worksheet
                        var worksheet = XLSX.utils.json_to_sheet(data);

                        // Calculate column widths
                        var columnWidths = [];
                        XLSX.utils.sheet_to_json(worksheet, { header: 1 }).forEach(function (row) {
                            row.forEach(function (value, columnIndex) {
                                columnWidths[columnIndex] = Math.max((columnWidths[columnIndex] || 0), String(value).length);
                            });
                        });

                        // Set column widths in the worksheet
                        worksheet['!cols'] = columnWidths.map(function (width) {
                            return { wch: width + 1 }; // Add some padding
                        });

                        // Add the worksheet to the workbook
                        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

                        // Save the workbook as an Excel file
                        var excelFileName = filename + '.xlsx';
                        XLSX.writeFile(workbook, excelFileName);
                    };
                var g = !1, b = null;

                function f(e) {
                    e ? null == b ? b = $.snackbar({
                        content: '<img src="./imgs/loader.gif" width="24" height="24" style="margin: -5px 5px 0 -5px" title="Loading..." /> Loading weather data, please wait...',
                        htmlAllowed: !0,
                        timeout: 6e4,
                        style: "info"
                    }) : b.snackbar("show") : null != b && b.snackbar("hide");
                }

                this.loadExampleData = function (t) {
                    var a;
                    switch (t) {
                        default:
                        case 0:
                            a = "./data/LondonGatwick_037760.epw";
                            break;

                        case 1:
                            a = "./data/PerthAustralia_946100.epw";
                            break;

                        case 2:
                            a = "./data/NewYorkCentralPark_725033.epw";
                            break;

                        case 3:
                            a = "./data/Singapore_486980.epw";
                    }
                    $.get(a, function (t) {
                        pdDOM.setLocalStorageItem("showStartMenu", 1), n.parseEPW(t) && e.Weather.updateWeatherStation(),
                            f(!1), g = !1;
                    }), g = !0, setTimeout(function () {
                        g && f(!0);
                    }, 500);
                }, this.windStrategies = function () {
                    var roughness = document.getElementById('roughness').value;
                    var height = document.getElementById('height').value;
                    var speed = document.getElementById('speed').value;
                    var window_height = document.getElementById('window_height').value;
                    var window_width = document.getElementById('window_width').value;
                    var wind_direction = document.getElementById('wind_direction').value;
                    var angle_wind = document.getElementById('angle_wind').value;

                    var ans1 = o.windAtHeight(roughness, height, speed).toFixed(2);
                    var WS_div = document.getElementById("windRes");
                    WS_div.innerText = "For height = " + height + ", wind speed = " + ans1 + speedUnit;
                    //
                    var cross_vent_val = ans1 * o.getIndoorWindSpeed(window_height, window_width, wind_direction, angle_wind);
                    var CV_div = document.getElementById("crossVentRes");
                    CV_div.innerText = "Cross Ventilation:\nIndoor wind velocity: " + cross_vent_val.toFixed(2) + "m/s\n\n";
                    //If the indoor average velocity is ≥ that the velocity required for comfort, then go to step 5.


                    // wind catcher
                    const C = 0.35;
                    const delta_T = 3;
                    const Btu = 48;
                    var v = cross_vent_val;
                    var A_ft = Btu / (C * 88 * 1.08 * delta_T * v);
                    CV_div.innerText += "For wind speed at the wind tower inlet = " + v.toFixed(2) + " mph and Building Heat Gain Rate = 48 Btu/hr,ft2: Size of the inlet = " + A_ft.toFixed(2) + "%\n\n";

                    //Stack Ventilation
                    // CV_div.innerText += "Stack Ventilation: \n";
                    // const C2 = 313;
                    // const delta_T2 = 1.7;
                    // const Btu2 = 30;
                    // var h = 3;
                    // var A_ft2 = Btu2 / (C2 * 88 * 1.08 * delta_T2 * h);
                    // CV_div.innerText += "For stack height = " + h + " Stack Area = " + A_ft2.toFixed(2) + "%\n\n";

                }, this.automate = function () {
                    // o.searchAndDownloadFile();
                    o.selectFile(".epw");
                    t.Chart.dataOverlay = 3;
                    o.dataLoaded();
                    e.Metric.showSelector(true);
                    e.Chart.infoOverlay(1);
                    e.Chart.showWetBulb(true);
                    e.Comfort.predictCLO(true);
                    e.Comfort.trackTemperature(true);
                    var popup = document.getElementById("myPopup");
                    popup.classList.toggle("show");

                    var popupDDY = document.getElementById("ddyPopUp");
                    popup.classList.toggle("show");
                    var result = "";
                    var matchesMDB2 = [];
                    var matchesMWB2 = [];
                    jQuery.get('LBN_BA_Beirut-Hariri.Intl.AP.401000_TMYx.2007-2021.ddy', function (data) {
                        matchesMDB2 = data.match(/\(DB=>MCWB\) 2%, MaxDB=\d+.\d+C/g);// gets Design day high temp (DB) line from the ddy file
                        matchesMWB2 = data.match(/\(DB=>MCWB\) 2%, MaxDB=\d+.\d+C MWB=\d+.\d+C/g); // gets Design day high temp (WB) line from the ddy file
                    });

                    var indexes = [];
                    const daysInEachMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // Days in each month
                    var minTemps = [];
                    var minHumidity = [];
                    let dayCount = 0;

                    addEventListener("month-comfort", async (event) => {
                        // writing to excel
                        var strategiesData = [];

                        //getting wind speed
                        const windSpeedData = n.annualHourly.windSpeed;
                        // console.log(windSpeedData);
                        const windSpeedFall = windSpeedData.slice(265, 357);
                        const windSpeedWinter = windSpeedData.slice(357, 365).concat(windSpeedData.slice(0, 79));
                        const windSpeedSpring = windSpeedData.slice(79, 172);
                        const windSpeedSummer = windSpeedData.slice(172, 265);//172 + 92

                        // get the day/night speed values per season
                        const dayNightFall = o.splitDayNight(windSpeedFall);
                        const dayArrayFall = dayNightFall[0];
                        const nightArrayFall = dayNightFall[1]

                        const dayNightWinter = o.splitDayNight(windSpeedWinter);
                        const dayArrayWinter = dayNightWinter[0];
                        const nightArrayWinter = dayNightWinter[1]

                        const dayNightSpring = o.splitDayNight(windSpeedSpring);
                        const dayArraySpring = dayNightSpring[0];
                        const nightArraySpring = dayNightSpring[1]

                        const dayNightSummer = o.splitDayNight(windSpeedSummer);
                        const dayArraySummer = dayNightSummer[0];
                        const nightArraySummer = dayNightSummer[1]



                        // Calculate the average per season
                        // let fallSum = windSpeedFall.reduce((acc, current) => parseFloat(acc) + parseFloat(current), 0);
                        // let fallAverage = fallSum / windSpeedFall.length;

                        // let winterSum = windSpeedWinter.reduce((acc, current) => parseFloat(acc) + parseFloat(current), 0);
                        // let winterAverage = winterSum / windSpeedWinter.length;

                        // let springSum = windSpeedSpring.reduce((acc, current) => parseFloat(acc) + parseFloat(current), 0);
                        // let springAverage = springSum / windSpeedSpring.length;

                        // let summerSum = windSpeedSummer.reduce((acc, current) => parseFloat(acc) + parseFloat(current), 0);
                        // let summerAverage = summerSum / windSpeedSummer.length;

                        // calculate average per season per day/night
                        let fallDaySum = dayArrayFall.reduce((acc, current) => parseFloat(acc) + parseFloat(current), 0);
                        let fallDayAverage = fallDaySum / dayArrayFall.length;

                        let fallNightSum = nightArrayFall.reduce((acc, current) => parseFloat(acc) + parseFloat(current), 0);
                        let fallNightAverage = fallNightSum / nightArrayFall.length;

                        let WinterDaySum = dayArrayWinter.reduce((acc, current) => parseFloat(acc) + parseFloat(current), 0);
                        let WinterDayAverage = WinterDaySum / dayArrayWinter.length;

                        let WinterNightSum = nightArrayWinter.reduce((acc, current) => parseFloat(acc) + parseFloat(current), 0);
                        let WinterNightAverage = WinterNightSum / nightArrayWinter.length;

                        let SpringDaySum = dayArraySpring.reduce((acc, current) => parseFloat(acc) + parseFloat(current), 0);
                        let SpringDayAverage = SpringDaySum / dayArraySpring.length;

                        let SpringNightSum = nightArraySpring.reduce((acc, current) => parseFloat(acc) + parseFloat(current), 0);
                        let SpringNightAverage = SpringNightSum / nightArraySpring.length;

                        let SummerDaySum = dayArraySummer.reduce((acc, current) => parseFloat(acc) + parseFloat(current), 0);
                        let SummerDayAverage = SummerDaySum / dayArraySummer.length;

                        let SummerNightSum = nightArraySummer.reduce((acc, current) => parseFloat(acc) + parseFloat(current), 0);
                        let SummerNightAverage = SummerNightSum / nightArraySummer.length;

                        popup.innerText = "Average Speeds in Day of Fall: " + fallDayAverage.toFixed(2) + speedUnit + "\n" + "Average Speeds in Night of Fall: " + fallNightAverage.toFixed(2) + speedUnit;
                        popup.innerText += "\nAverage Speeds in Day of Winter: " + WinterDayAverage.toFixed(2) + speedUnit + "\n" + "Average Speeds in Night of Winter: " + WinterNightAverage.toFixed(2) + speedUnit;
                        popup.innerText += "\nAverage Speeds in Day of Spring: " + SpringDayAverage.toFixed(2) + speedUnit + "\n" + "Average Speeds in Night of Spring: " + SpringNightAverage.toFixed(2) + speedUnit;
                        popup.innerText += "\nAverage Speeds in Day of Summer: " + SummerDayAverage.toFixed(2) + speedUnit + "\n" + "Average Speeds in Night of Summer: " + SummerNightAverage.toFixed(2) + speedUnit;

                        //gets them from the data directly
                        // popup.innerText += "\n\nWind Speeds by seasons:\nThe average of wind Speeds in Fall: " + fallAverage.toFixed(2) + "\nThe average of wind Speeds in Winter: " + winterAverage.toFixed(2) + "\nThe average of wind Speeds in Spring: " + springAverage.toFixed(2) + "\nThe average of wind Speeds in Summer: " + summerAverage.toFixed(2);

                        //gets them from day and night avg
                        popup.innerText += "\n\nWind Speeds by seasons:\nThe average of wind Speeds in Fall: " + ((fallDayAverage + fallNightAverage) / 2).toFixed(2) + speedUnit + "\nThe average of wind Speeds in Winter: " + ((WinterDayAverage + WinterNightAverage) / 2).toFixed(2) + speedUnit + "\nThe average of wind Speeds in Spring: " + ((SpringDayAverage + SpringNightAverage) / 2).toFixed(2) + speedUnit + "\nThe average of wind Speeds in Summer: " + ((SummerDayAverage + SummerNightAverage) / 2).toFixed(2) + speedUnit;

                        //getting humidity on DD low
                        const humidtyData = n.annualHourly.relHumidity;

                        ////////////////////////////////////////////////////////////
                        //getting the minTemp
                        const tempData = n.annualHourly.tempDryBulb;
                        // Loop through the data, breaking it down into chunks representing each month

                        const dayNightSpeedData = o.splitDayNight(windSpeedData);
                        const dayArrayMonth = dayNightSpeedData[0];
                        const nightArrayMonth = dayNightSpeedData[1];

                        for (let a = 0; a <= 11; a++) {
                            e.Metric.month(null, a);
                            e.DateTime.onDateTimeChange(e.DateTime, !0);
                            e.Comfort.openOptionsPopup(true);
                            const maxTemp = w[1].dbt.toFixed(1), relativeHumidity = w[1].rel.toFixed(1),
                                tempHumidityPair = "[" + maxTemp + " , " + relativeHumidity + "]";
                            var avgDayWBtempMin = o.calculateWBTemp(w[0].dbt.toFixed(1), w[0].rel.toFixed(1));
                            var avgDayWBtempMax = o.calculateWBTemp(maxTemp, relativeHumidity);
                            result = result + "---------------------------------------------------------------------------------------------------------------------------------------------------\n" +
                                "MONTH: " + moment().month(a).format("MMMM") + "\n" +
                                "***********************  Average Day  ***********************\n" +
                                "Mean Outdoor Temperature: " + t.Comfort.meanOutdoorTemperature.toFixed(1) + tempUnit + "\n" +
                                "MIN Dry Bulb Temperature: " + w[0].dbt.toFixed(1) + tempUnit + "\n" +
                                "MIN Wet Bulb Temperature: " + avgDayWBtempMin + tempUnit + "\n" +
                                "Relative Humidity at MIN Dry Bulb Temperature: " + w[0].rel.toFixed(1) + " %\n" +
                                "MAX Dry Bulb Temperature: " + maxTemp + tempUnit + "\n" +
                                "MAX Wet Bulb Temperature: " + avgDayWBtempMax + tempUnit + "\n" +
                                "Relative Humidity at MAX Dry Bulb Temperature: " + relativeHumidity + " %\n" +
                                "Percentage in Comfort: " + t.Comfort.percentageInComfort + " %\n" +
                                "Is MAX in Comfort Zone: " + i.isInComfortZone(maxTemp, relativeHumidity) + "\n";
                            res = o.averageDayStrategies(maxTemp, relativeHumidity, result);

                            result = res[0];
                            CoolV_val = res[1];
                            HM_val = res[2];
                            HMNV_val = res[3];
                            EC_val = res[4];
                            ComfV_val = res[5];

                            var monthData = {
                                Month: 'Month ' + (a + 1),
                                Day: 'Average Day',
                                'Cooling Ventilation': CoolV_val,
                                'High Mass': HM_val,
                                'High Mass Night Ventilation': HMNV_val,
                                'Evaporation Cooling': EC_val,
                                'Comfort Ventilation': ComfV_val,
                            };

                            strategiesData.push(monthData);

                            var designDayTempMinDB = [];// contains the min temps in each month
                            var designDayTempMaxDB = parseFloat(matchesMDB2[a].match(/\d+.\d+/g)[0]);// gets numeric values of high temp MaxDB
                            var designDayTempMaxWB = parseFloat(matchesMWB2[a].match(/\d+.\d+/g)[1]);// gets numeric values of high temp MaxWB

                            //getting tempMin in each month
                            var target = designDayTempMaxDB;

                            // Initialize an array to store the results
                            const tempResults = [];
                            const humidityResults = [];
                            const monthTempData = [];
                            const monthHumidityData = [];
                            const monthSpeedData = [];
                            const monthSpeedDataDay = [];
                            const monthSpeedDataNight = [];
                            var count = 0;
                            for (let day = 0; day < daysInEachMonth[a]; day++) {
                                monthTempData.push(tempData[dayCount]);//[[24], [24], ..., [24]]
                                monthHumidityData.push(humidtyData[dayCount]);
                                monthSpeedData.push(windSpeedData[dayCount]);
                                monthSpeedDataDay.push(dayArrayMonth[dayCount]);
                                monthSpeedDataNight.push(nightArrayMonth[dayCount]);
                                dayCount++;
                            }

                            // console.log("month " + a);
                            // console.log(monthTempData);
                            // console.log(monthHumidityData);

                            // Loop over the days within each month
                            const monthResultsTemp = [];
                            const monthResultsHumidity = [];
                            const monthResultsSpeed = [];
                            var avgSpeedsMonth = 0;
                            var avgSpeedsMonthDay = 0;
                            var avgSpeedsMonthNight = 0;
                            for (let i = 0; i < monthTempData.length; i++) {
                                var avg = 0;
                                var avg1 = 0;
                                var avg2 = 0;
                                const dayTempData = monthTempData[i];
                                const dayHumidityData = monthHumidityData[i];
                                const hourlyWindSpeedData = monthSpeedData[i];//[1, 2, ..., 24]
                                const hourlyWindSpeedDataDay = monthSpeedDataDay[i];//[1, 2, ..., 12]
                                const hourlyWindSpeedDataNight = monthSpeedDataNight[i];//[1, 2, ..., 12]
                                for (let j = 0; j < hourlyWindSpeedDataDay.length; j++) {
                                    avg1 += hourlyWindSpeedDataDay[j];
                                    avg2 += hourlyWindSpeedDataNight[j];
                                }
                                for (let j = 0; j < dayTempData.length; j++) {
                                    if (dayTempData[j] === target) {//|| (dayData[j] >= target - 1 && dayData[j] <= target + 1)
                                        // monthResults.push(target);
                                        // console.log("found " + target + " in month " + a + " day " + i + " hour " + j);
                                        const tempNumbers = dayTempData;
                                        const humidityNumbers = dayHumidityData;
                                        tempNumbers.sort((a, b) => a - b);
                                        humidityNumbers.sort((a, b) => a - b);
                                        monthResultsTemp.push(tempNumbers[0]);
                                        monthResultsHumidity.push(humidityNumbers[0]);
                                    }
                                    else if ((dayTempData[j] >= target - 1 && dayTempData[j] <= target + 1)) {
                                        const tempNumbers = dayTempData;
                                        const humidityNumbers = dayHumidityData;
                                        tempNumbers.sort((a, b) => a - b);
                                        humidityNumbers.sort((a, b) => a - b);
                                        monthResultsTemp.push(tempNumbers[0]);
                                        monthResultsHumidity.push(humidityNumbers[0]);
                                    }
                                    avg += hourlyWindSpeedData[j];
                                }
                                avg /= 24;
                                avg1 /= 12;
                                avg2 /= 12;
                                avgSpeedsMonth += avg;
                                avgSpeedsMonthDay += avg1;
                                avgSpeedsMonthNight += avg2;
                            }// monthResultsTemp contains the min temp corresponding to the high temp, might contain several minimum values.
                            // console.log(avgSpeedsMonth / monthSpeedData.length);
                            avgSpeedsMonth = (avgSpeedsMonth / monthSpeedData.length).toFixed(2);
                            avgSpeedsMonthDay = (avgSpeedsMonthDay / monthSpeedDataDay.length).toFixed(2);
                            avgSpeedsMonthNight = (avgSpeedsMonthNight / monthSpeedDataNight.length).toFixed(2);
                            // console.log(monthResultsSpeed);
                            // Calculate the average if there are results in the month
                            if (monthResultsTemp.length > 0) {
                                const sum = monthResultsTemp.reduce((acc, value) => acc + value, 0);
                                const average = sum / monthResultsTemp.length;
                                tempResults.push({
                                    month: a,
                                    average: average,
                                });
                                // console.log(average);
                            }
                            if (monthResultsHumidity.length > 0) {
                                const sum = monthResultsHumidity.reduce((acc, value) => acc + value, 0);
                                const average = sum / monthResultsHumidity.length;
                                humidityResults.push({
                                    month: a,
                                    average: average,
                                });
                                // console.log(average);
                            }


                            var previousMonthIndices = 0;// how many days in months
                            for (let b = 0; b < a; b++) {
                                previousMonthIndices += moment("2023-0" + (b + 1), "YYYY-MM").daysInMonth();
                            }
                            // console.log(previousMonthIndices);

                            var currentMonthIndex = moment("2023-0" + (a + 1), "YYYY-MM").daysInMonth();

                            n.annualHourly.tempDryBulb.slice(previousMonthIndices, previousMonthIndices + currentMonthIndex)
                                .forEach((element, index) => {//element has the 24 temp values per day, each value is per hr in a day
                                    // console.log(element);
                                    element.sort();
                                    var maxInDayTemp = element[23];
                                    if ((maxInDayTemp >= (designDayTempMaxDB - 0.5)) && (maxInDayTemp <= (designDayTempMaxDB + 0.5))) {
                                        indexes.push(previousMonthIndices + index);
                                        designDayTempMinDB.push(element[0]);// adding low temps in days where high temps satisfy the formula above
                                    }
                                });
                            // console.log(designDayTempMinDB);// why DB?

                            // n.annualHourly.tempDryBulb.forEach((element, index) => {
                            //         element.sort();
                            //         var maxInDayTemp = element[23];
                            //         if ((maxInDayTemp >= (designDayTempMaxDB - 0.5)) && (maxInDayTemp <= (designDayTempMaxDB + 0.5))) {
                            //             indexes.push(index);
                            //             designDayTempMinDB.push(element[0]);
                            //         }
                            //     });
                            var totalDesignMinTempDB = 0;
                            designDayTempMinDB.forEach((element) => {
                                totalDesignMinTempDB += element;
                            });

                            var designDayTempMin = (totalDesignMinTempDB / indexes.length).toFixed(1);// this is the value we are displaying: DD low temp
                            // console.log(designDayTempMin);
                            var designDayHumidityMax = o.calculateHumidity(designDayTempMaxDB, designDayTempMaxWB);//  DD High temp humidity

                            var totalDesignMinHumidity = 0;
                            indexes.forEach((element) => {
                                var humDay = n.annualHourly.relHumidity[element];
                                humDay.sort();
                                totalDesignMinHumidity += humDay[0];
                            });

                            var designDayHumidityMin = (totalDesignMinHumidity / indexes.length).toFixed(1);

                            var val = -1;
                            if (tempResults[0] !== undefined)
                                val = tempResults[0].average.toFixed(1);
                            else
                                val = undefined;

                            var val2 = -1;
                            if (humidityResults[0] !== undefined)
                                val2 = humidityResults[0].average.toFixed(1);
                            else
                                val2 = undefined;

                            var designDayWBtempMin = o.calculateWBTemp(val, val2);

                            result += "**************************  Design Day  *************************\n" +
                                "Design Day High Temp (DB): " + designDayTempMaxDB + tempUnit + "\n" +
                                "Design Day High Temp (WB): " + designDayTempMaxWB + tempUnit + "\n" +
                                "Design Day Humidity at High Temp: " + designDayHumidityMax + " %\n" +
                                // "Design Day Low Temp aida: " + designDayTempMin + "\n" + // by aida
                                "Design Day Low Temp DB: " + val + tempUnit + "\n" + // by me
                                "Design Day Low Temp WB: " + designDayWBtempMin + tempUnit + "\n" + // by me
                                // "Design Day Humidity at Low Temp aida: " + designDayHumidityMin + " %\n"// this was commented by aida, i uncommented it
                                "Design Day Humidity at Low Temp: " + val2 + " %\n";

                            res = o.designDayStrategies(designDayTempMaxDB, designDayHumidityMax, result);

                            result = res[0];
                            CoolV_val = res[1];
                            HM_val = res[2];
                            HMNV_val = res[3];
                            EC_val = res[4];
                            ComfV_val = res[5];

                            result = o.getWindSpeed(result, avgSpeedsMonth, avgSpeedsMonthDay, avgSpeedsMonthNight, speedUnit);

                            var monthData = {
                                Month: '',
                                Day: 'Design Day',
                                'Cooling Ventilation': CoolV_val,
                                'High Mass': HM_val,
                                'High Mass Night Ventilation': HMNV_val,
                                'Evaporation Cooling': EC_val,
                                'Comfort Ventilation': ComfV_val,
                            };
                            strategiesData.push(monthData);

                            // console.log("Indices: " + indexes);
                            indexes = [];


                            // Wind strategies
                            //avgSpeedsMonth
                            // var roughness = 0;
                            // var height = 0; // dropdown: 10 m to 60m
                            // var gotSpeed = 0; // to be get from the website calculator

                            // //cross ventilation:
                            // //ask for 1. size of window, 2. direction of wind, 3. angle of wind on window
                            // var window_height = 0.3;
                            // var window_width = 0.3;
                            // var windDirection = "normal";
                            // var angleWind = "single opening";

                            // var windPercent = o.getIndoorWindSpeed(window_height, window_width, windDirection, angleWind);

                            // var indoorWindSpeed = windPercent * gotSpeed;



                        }
                        // Call the exportToExcel to export the strategies to excel
                        // o.exportToExcel(strategiesData, 'Beirut');
                        popup.innerText += "\n" + result;
                    });
                }, this.averageDayStrategies = function (maxTemp, relativeHumidity, result) {
                    result += "-------- Strategies --------" + "\n" +
                        "Cooling Ventilation: " + o.strategyEffectivenessCategoryI(maxTemp, relativeHumidity) + "\n" +
                        "High Mass: " + o.strategyEffectivenessCategoryI(maxTemp, relativeHumidity) + "\n" +
                        "High Mass Night Ventilation: " + o.strategyEffectivenessCategoryI(maxTemp, relativeHumidity) + "\n" +
                        "Evaporation Cooling: " + o.strategyEffectivenessCategoryI(maxTemp, relativeHumidity) + "\n" +
                        "Comfort Ventilation: " + o.strategyEffectivenessCategoryII(maxTemp, relativeHumidity) + "\n";
                    return [result, o.strategyEffectivenessCategoryI(maxTemp, relativeHumidity), o.strategyEffectivenessCategoryI(maxTemp, relativeHumidity), o.strategyEffectivenessCategoryI(maxTemp, relativeHumidity), o.strategyEffectivenessCategoryI(maxTemp, relativeHumidity), o.strategyEffectivenessCategoryII(maxTemp, relativeHumidity)];
                }, this.designDayStrategies = function (maxTemp, relativeHumidity, result) {
                    result += "-------- Strategies --------" + "\n" +
                        "Cooling Ventilation: " + o.strategyEffectivenessCategoryI(maxTemp, relativeHumidity) + "\n" +
                        "High Mass: " + o.strategyEffectivenessCategoryI(maxTemp, relativeHumidity) + "\n" +
                        "High Mass Night Ventilation: " + o.strategyEffectivenessCategoryI(maxTemp, relativeHumidity) + "\n" +
                        "Evaporation Cooling: " + o.strategyEffectivenessCategoryI(maxTemp, relativeHumidity) + "\n" +
                        "Comfort Ventilation: " + o.strategyEffectivenessCategoryII(maxTemp, relativeHumidity) + "\n";
                    return [result, o.strategyEffectivenessCategoryI(maxTemp, relativeHumidity), o.strategyEffectivenessCategoryI(maxTemp, relativeHumidity), o.strategyEffectivenessCategoryI(maxTemp, relativeHumidity), o.strategyEffectivenessCategoryI(maxTemp, relativeHumidity), o.strategyEffectivenessCategoryII(maxTemp, relativeHumidity)];
                }, this.getWindSpeed = function (result, windspeed, dayspeed, nightspeed, speedUnit) {
                    result += "**************************  Wind Speed  *************************\n" +
                        "Average wind speed: " + windspeed + speedUnit + "\n" +
                        "Average wind speed in Day: " + dayspeed + speedUnit + "\n" +
                        "Average wind speed in Night: " + nightspeed + speedUnit + "\n";
                    return result;
                }, this.strategyEffectivenessCategoryI = function (maxTemp, relativeHumidity) {
                    var notNeeded = i.notNeededStrategyCategoryI(maxTemp, relativeHumidity);
                    var effective = i.effectiveStrategyCategoryI(maxTemp, relativeHumidity);
                    var ineffective = !notNeeded && !effective;
                    return o.strategyDecision(notNeeded, effective);
                }, this.strategyEffectivenessCategoryII = function (maxTemp, relativeHumidity) {
                    var notNeeded = i.notNeededStrategyCategoryII(maxTemp, relativeHumidity);
                    var ineffective = i.ineffectiveStrategyCategoryII(maxTemp, relativeHumidity);
                    var effective = !notNeeded && !ineffective;
                    return o.strategyDecision(notNeeded, effective);
                }, this.strategyDecision = function (notNeeded, effective) {
                    if (notNeeded) return "Not Needed";
                    else if (effective) return "Effective";
                    else return "Ineffective";
                }, this.calculateHumidity = function (dbTemp, wbTemp) {
                    var eDFraction = (17.502 * dbTemp) / (240.97 + dbTemp);
                    var eD = 6.112 * Math.pow(Math.E, eDFraction);

                    var eWFraction = (17.502 * wbTemp) / (240.97 + wbTemp);
                    var eW = 6.112 * Math.pow(Math.E, eWFraction);

                    var num = eW - 0.6687451584 * (1 + 0.00115 * wbTemp) * (dbTemp - wbTemp);
                    var humidity = num / eD * 100;
                    return humidity.toFixed(1);
                }, this.calculateWBTemp = function (dbTemp, humidity) {
                    var dbTemp = parseFloat(dbTemp);
                    var humidity = parseFloat(humidity);
                    var Tw = dbTemp * Math.atan(0.151977 * Math.pow(humidity + 8.313659, 1 / 2)) + Math.atan(dbTemp + humidity) - Math.atan(humidity - 1.676331) + 0.00391838 * Math.pow(humidity, 3 / 2) * Math.atan(0.023101 * humidity) - 4.686035;
                    return Tw.toFixed(1);
                }, this.splitDayNight = function (inputArray) {
                    const dayArray = [];
                    const nightArray = [];

                    // Assuming day starts at 6 AM and ends at 6 PM
                    const dayStartHour = 6;
                    const dayEndHour = 18;

                    // Iterate over each inner array
                    for (let hourArray of inputArray) {
                        // Split values into day and night based on the hour
                        const dayValues = hourArray.slice(dayStartHour, dayEndHour);
                        const nightValues = [...hourArray.slice(0, dayStartHour), ...hourArray.slice(dayEndHour)];

                        // Push the values to the respective arrays
                        dayArray.push(dayValues);
                        nightArray.push(nightValues);
                    }

                    return [dayArray, nightArray];
                },
                    this.windAtHeight = function (z, h2, v) {
                        const h1 = 10;
                        var result = v * ((Math.log(h2 / z)) / (Math.log(h1 / z)));
                        return result;
                    },
                    this.searchAndDownloadFile = function () {
                        var cityName = document.getElementById("city").value.trim();
                        if (cityName === "") {
                            alert("Please enter a city name.");
                            return;
                        }
                        // Perform a web search (simplified example)
                        var searchQuery = "https://example.com/search?q=" + encodeURIComponent(cityName);
                        // For simplicity, assume the search results contain a link to the file
                        var fileUrl = "https://example.com/download/" + encodeURIComponent(cityName) + ".txt";
                        // Initiate the file download
                        window.open(fileUrl, '_blank');
                    }, this.getIndoorWindSpeed = function (window_height, window_width, windDirection, angleWind) {
                        var windPercent = 0;
                        if (parseFloat(window_height) === 0.3 && parseFloat(window_width) === 0.3) {
                            if (angleWind === "single opening") {
                                if (windDirection === "normal")
                                    windPercent = 0.12;
                                else
                                    windPercent = 0.14;
                            }
                            else if (angleWind === "two openings adjacent") {
                                if (windDirection === "normal")
                                    windPercent = 0.37;
                                else
                                    windPercent = 0.45;
                            }
                            else if (angleWind === "two openings opposite") {
                                if (windDirection === "normal")
                                    windPercent = 0.35;
                                else
                                    windPercent = 0.42;
                            }
                        }
                        else if (parseFloat(window_height) === 0.3 && parseFloat(window_width) === 0.6) {
                            if (angleWind === "single opening") {
                                if (windDirection === "normal")
                                    windPercent = 0.13;
                                else
                                    windPercent = 0.17;
                            }
                            else if (angleWind === "two openings same") {
                                windPercent = 0.22;
                            }
                            else if (angleWind === "two openings adjacent") {
                                if (windDirection === "normal")
                                    windPercent = 0.37;
                                else
                                    windPercent = 0.45;
                            }
                            else if (angleWind === "two openings opposite") {
                                if (windDirection === "normal")
                                    windPercent = 0.37;
                                else
                                    windPercent = 0.51;
                            }
                        }
                        else if (parseFloat(window_height) === 0.3 && parseFloat(window_width) === 1) {
                            if (angleWind === "single opening") {
                                if (windDirection === "normal")
                                    windPercent = 0.16;
                                else
                                    windPercent = 0.23;
                            }
                            else if (angleWind === "two openings same") {
                                windPercent = 0.23;
                            }
                            else if (angleWind === "two openings adjacent") {
                                if (windDirection === "normal")
                                    windPercent = 0.40;
                                else
                                    windPercent = 0.51;
                            }
                            else if (angleWind === "two openings opposite") {
                                if (windDirection === "normal")
                                    windPercent = 0.47;
                                else
                                    windPercent = 0.65;
                            }
                        }
                        return windPercent;
                    }, this.setupDDY = function () {
                        o.selectFile(".ddy");
                    }, this.selectEPWFile = function () {
                        o.selectFile(".epw");
                    }, this.selectCSVFile = function () {
                        o.selectFile(".csv");
                    }, this.showLoadSettings = function () {
                        o.selectFile(".json");
                    }, this.importFile = function (t) {
                        function r() {
                            e.Manager.showWaitingCursor(!1);
                            var t = "File does not contain a recognisable data format.";
                            null != S ? ($("#modal-data-error").text(t), $("#modal-data-alert").removeClass("hidden"),
                                o.paramErrorVisible = !0) : window.alert("ERROR: " + t);
                        }

                        e.Manager.showWaitingCursor(!0), pdKO.importFiles(t, {
                            json: function (t, i) {
                                if (e.Manager.showWaitingCursor(!1), t && t.result) {
                                    if (e.Manager.importDialogOpen()) return void e.Manager.importText(t.result);
                                    var n = JSON.parse(t.result), s = "";
                                    pd.isArray(n.ProcessPoints) ? (pd.isObject(n.PsychrometricUnits) && (s = n.PsychrometricUnits["DryBulbTemperature(DBT)"]),
                                        e.Chart.readProcessPoints(n.ProcessPoints, s)) : (n.Chart || n.Comfort) && (a ? a.setText(t.result) : o.paramData(t.result),
                                            null != S ? (o.paramDataChanged(!0), $("#file-drop-box-label").html("File successfully loaded: <em>" + i.name + "</em>"),
                                                a && a.focus()) : o.parseParamData());
                                } else r();
                            },
                            error: r,
                            extra: [{
                                match: ".csv",
                                callback: function (t) {
                                    e.Manager.showWaitingCursor(!1), t && t.result && (e.Manager.importDialogOpen() ? e.Manager.importText(t.result) : pd.startsWith(t.result, "#PD:ProcessPoints,") ? e.Chart.readCSVProcessPoints(t) : ($("#modal-import").modal("show"),
                                        o.importText(t.result)));
                                }
                            }, {
                                match: ".epw",
                                callback: function (t) {
                                    e.Manager.showWaitingCursor(!1), pdDOM.setLocalStorageItem("showStartMenu", 1),
                                        n.parseEPW(t) && e.Weather.updateWeatherStation();
                                    dispatchEvent(new Event('month-comfort'));
                                }
                            }]
                        });
                    }, this.storeSettings = function () {
                        !0 === confirm("This will store your current settings as your initial start-up configuration.\n\nAre you sure?") && t.writeToLocalStorage();
                    }, this.clearSettings = function () {
                        !0 === confirm("This will remove any stored start-up configuration data and return to original default values.\n\nAre you sure?") && t.clearLocalStorage();
                    };
            }();
    }();
    s.Chart.maxDayIndex = ko.observable(t.Chart.isLeapYear ? 365 : 364), o.year(t.Chart.isLeapYear ? 2e3 : 2001),
        window.App = s;
    var l = null;

    function d(e, t) {
        s.updateOnChange = !1;
        var a = s.Chart.maxDayIndex();
        e = e < 0 ? 0 : e > a ? a : e, s.Metric.fromDay(e), t = t < e ? e : t > a ? a : t,
            s.Metric.toDay(t), O(), l.setRange(e, t), s.updateOnChange = !0;
    }

    function u() {
        i.dryBulbTemperature = t.Comfort.dryBulbTemperature, i.relativeHumidity = t.Comfort.relativeHumidity,
            i.clothingLevel = t.Comfort.clothingLevel, i.metabolicRate = t.Comfort.metabolicRate,
            i.externalWork = t.Comfort.externalWork, i.meanRadiantTemperature = t.Comfort.meanRadiantTemperature,
            i.airVelocity = t.Comfort.airVelocity, i.meanOutdoorTemperature = t.Comfort.meanOutdoorTemperature,
            i.thermalMassEfficacy = t.Comfort.thermalMassEfficacy, i.solarGainsEfficacy = t.Comfort.solarGainsEfficacy,
            i.internalHeatGains = t.Comfort.internalHeatGains, i.solarExposure = t.Comfort.solarExposure;
    }

    l = new pdSVG.RangeSelector({
        elementId: "#chart-range",
        focusId: "#layout-chart-panel",
        rangeStart: t.DateTimeRange.fromDay,
        rangeEnd: t.DateTimeRange.toDay,
        rangeStartObservable: s.Metric.fromDay,
        rangeEndObservable: s.Metric.toDay,
        throttledRescale: 40,
        axisAlign: pd.Align.RIGHT,
        extendRange: t.Chart.paddingBottom - (t.Chart.paddingBottom < 20 ? 5 : 20),
        paddingRight: t.Chart.paddingRight,
        paddingLeft: t.Chart.paddingLeft,
        paddingBottom: 25,
        paddingTop: 0
    }), u();
    var m = pdSVG.DATA_FORMAT_UNKNOWN || 0, h = pdSVG.DATA_FORMAT_DAY_HOUR || 1, c = pdSVG.DATA_FORMAT_HOURLY || 2,
        p = pdSVG.DATA_FORMAT_DAILY || 3, g = pdSVG.DATA_FORMAT_MONTHLY || 4,
        b = ["Avg.", "Max.", "Min.", "Above", "Below", "Between"];

    function f(e, t, a) {
        return e > t;
    }

    function v(e, t, a) {
        return e < a;
    }

    function y(e, t, a) {
        return e > t && e < a;
    }

    function C(e, t) {
        e.value += t;
    }

    function M(e, t) {
        e.value < t && (e.value = t);
    }

    function T(e, t) {
        e.value > t && (e.value = t);
    }

    var D = new pd.Grid2D(), x = [1, 2, 4, 8, 16, 32, 64];

    function R(e, a, r) {
        var o = s.Metric.operation(), l = s.Metric.summation();
        if (a.decimals = 0, i && n && e && e.data) {
            var d, u, m, p = function (e) {
                if (s.Metric.calculateFrequency()) return function (e) {
                    e.value += 1;
                };
                switch (e) {
                    default:
                    case 0:
                        return C;

                    case 1:
                        return M;

                    case 2:
                        return T;

                    case 3:
                        var t = s.Metric.thresholdLower();
                        return function (e, a) {
                            a > t && (e.value += 1);
                        };

                    case 4:
                        var a = s.Metric.thresholdUpper();
                        return function (e, t) {
                            t < a && (e.value += 1);
                        };

                    case 5:
                        return t = s.Metric.thresholdLower(), a = s.Metric.thresholdUpper(), function (e, r) {
                            r > t && r < a && (e.value += 1);
                        };
                }
            }(o), g = t.Chart.dryBulbMin, R = t.Chart.dryBulbMax, w = n.getMetric(pdWeather.Metric.DRY_BULB).data,
                P = n.getMetric(pdWeather.Metric.REL_HUMIDITY).data, k = e.data, O = 0, A = s.Metric.sliderLockScale(),
                S = t.Chart.gridVerticalAxis < 0 ? t.Chart.verticalAxis > 0 : t.Chart.gridVerticalAxis > 0,
                L = s.Metric.gridHighRes() > 0 ? 2 : 1, H = i.getPsychrometrics(), E = i.getTemperatureConverter();
            switch (i.getTemperatureConverter().units) {
                default:
                    u = L * Math.round(pd.safeDivide(E.max - E.min, E.tickMinor)) + 1;
                    break;

                case pdUnits.FARENHEIT:
                case pdUnits.RANKINE:
                    u = L * Math.round(pd.safeDivide(E.max - E.min, 2 * E.tickMinor)) + 1;
            }
            var B = i.getHumidityRatioConverter();
            m = S ? t.Chart.gridHighRes > 0 ? 101 : 41 : L * Math.round(pd.safeDivide(B.max, B.tickMinor)) + 1;
            var F, V, N, U, I = Math.max(1, R - g) / (u - 1),
                W = Math.max(1, S ? 100 : t.Chart.absHumidityMax) / (m - 1), G = t.DateTimeRange.fromDay,
                _ = t.DateTimeRange.toDay, $ = Math.floor(pd.toNumber(t.DateTimeRange.fromTime, 0)),
                K = Math.floor(pd.toNumber(t.DateTimeRange.toTime, 0)), Y = G % 7 + t.DateTimeRange.startDayOfWeek,
                j = t.DateTimeRange.dayFilter, J = k.length, z = s.Metric.filterOp(), q = s.Metric.filterLower(),
                X = s.Metric.filterUpper(), Z = s.Metric.filterMetric().data, Q = null;
            switch (z) {
                case 1:
                    Q = f;
                    break;

                case 2:
                    Q = v;
                    break;

                case 3:
                    Q = y;
            }
            if (_ < G && (_ += n.dayCount), _ - G >= n.dayCount && (_ = G + n.dayCount - 1),
                K <= $ && (K += 24), K - $ > 24 && (K = $ + 24), D.setSize(u, m), D.map(function (e) {
                    e.value = 0, e.avg = 0;
                }), a.decimals = e.decimals, a.units = e.units, e.format == h && k.length >= 365) for (var ee = G; ee <= _; ++ee) {
                    if (N = ee >= J ? ee - J : ee, j & x[Y]) for (var te = $; te < K; ++te) U = te >= 24 ? te - 24 : te,
                        Q && !Q(Z[N][U], q, X) || (F = w[N][U], V = S ? Math.min(P[N][U], 99.5) : H.calcAbsFromRelHumidity(F, P[N][U]),
                            (d = D.getCell(Math.floor((F - g) / I), Math.floor(V / W))) && (p(d, k[N][U]), d.avg += 1),
                            ++O);
                    ++Y > 6 && (Y = 0);
                } else if (e.format == c && k.length >= 8760) {
                    var ae = 0;
                    J = k.length > 8783 ? 366 : 365;
                    for (ee = G; ee <= _; ++ee) {
                        if (N = ee >= J ? ee - J : ee, j & x[Y]) for (te = $; te < K; ++te) U = te >= 24 ? te - 24 : te,
                            Q && !Q(Z[ae + te], q, X) || (F = w[N][U], V = S ? Math.min(P[N][U], 99.5) : H.calcAbsFromRelHumidity(F, P[N][U]),
                                (d = D.getCell(Math.floor((F - g) / I), Math.floor(V / W))) && (p(d, k[ae + te]),
                                    d.avg += 1), ++O);
                        ae += 24, ++Y > 6 && (Y = 0);
                    }
                }
            if (!s.Metric.calculateFrequency()) if (0 == o) D.map(function (e) {
                e.avg > 0 ? e.value /= e.avg : e.value = 0;
            }); else if (o > 2) switch (O < 1 && (O = 1), l) {
                default:
                case 0:
                    D.map(function (e) {
                        e.value = pd.snapTo(e.value / O * 100, .1);
                    });
                    break;

                case 1:
                    D.map(function (e) {
                        e.value = pd.snapTo(e.value / O, .1);
                    });
                    break;

                case 2:
                    D.map(function (e) {
                        e.value = Math.round(e.value);
                    });
            }
            var re = !0;
            if (D.map(function (e) {
                e.avg > .001 && (re ? (a.max = a.min = e.value, re = !1) : (a.min > e.value && (a.min = e.value),
                    a.max < e.value && (a.max = e.value)));
            }), o > 2) switch (l) {
                default:
                case 0:
                    a.decimals = 3, a.units = "%";
                    break;

                case 1:
                    a.decimals = 5, a.units = "";
                    break;

                case 2:
                    a.decimals = 0, a.units = "hrs";
            }
            if (r) {
                var ie, oe = i.width() > 900 ? e.name : e.shortName;
                if (s.Metric.calculateFrequency()) ie = oe + " " + e.units; else if (o > 2) {
                    switch (l) {
                        default:
                        case 0:
                            ie = "Percent Time " + e.shortName + " " + b[o];
                            break;

                        case 1:
                            ie = "Fraction Time " + e.shortName + " " + b[o];
                            break;

                        case 2:
                            ie = "Hours " + e.shortName + " " + b[o];
                    }
                    switch (o) {
                        case 3:
                            ie += " " + s.Metric.thresholdLower().toFixed(a.decimals);
                            break;

                        case 4:
                            ie += " " + s.Metric.thresholdUpper().toFixed(a.decimals);
                            break;

                        case 5:
                            ie += " " + s.Metric.thresholdLower().toFixed(a.decimals) + " and " + s.Metric.thresholdUpper().toFixed(a.decimals);
                    }
                    ie += " " + e.units;
                } else ie = b[o] + " " + oe + " (" + a.units + ")";
                s.setValueWithoutUndo(s.Chart.dataOverlay, 1), i.set({
                    dataOverlay: 1,
                    subTitle: ie,
                    gridFadeCells: t.Chart.gridFadeCells,
                    dataDecimals: a.decimals,
                    dataMin: A ? s.Metric.min() : a.min,
                    dataMax: A ? s.Metric.max() : a.max,
                    units: a.units
                }), D.type = S ? 1 : 0, i.setDataGrid(D, e);
            }
        }
        return a.value = Math.max(0, a.max - a.min), a;
    }

    var w = [];

    function P(e, a, r) {
        if (a.decimals = 0, i && n && e && e.data) {
            var l, d, u, m = !0, p = n.getMetric(pdWeather.Metric.DRY_BULB).data,
                g = n.getMetric(pdWeather.Metric.REL_HUMIDITY).data, b = e.data, C = w;
            w.length = 0;
            var M, T = t.DateTimeRange.fromDay, D = t.DateTimeRange.toDay,
                R = Math.floor(pd.toNumber(t.DateTimeRange.fromTime, 0)),
                P = Math.floor(pd.toNumber(t.DateTimeRange.toTime, 0)), k = T % 7 + t.DateTimeRange.startDayOfWeek,
                O = t.DateTimeRange.dayFilter, A = b.length, S = s.Metric.filterOp(), L = s.Metric.filterLower(),
                H = s.Metric.filterUpper(), E = s.Metric.filterMetric().data, B = null;
            switch (S) {
                case 1:
                    B = f;
                    break;

                case 2:
                    B = v;
                    break;

                case 3:
                    B = y;
            }
            if (D < T && (D += n.dayCount), D - T >= n.dayCount && (D = T + n.dayCount - 1),
                P <= R && (P += 24), P - R > 24 && (P = R + 24), a.decimals = e.decimals, a.units = e.units,
                4 == t.Chart.dataOverlay) {
                if (e.format == h && A >= 365) if (T == D) {
                    ie = T >= A ? T - A : T;
                    for (var F = R; F < P; ++F) M = F >= 24 ? F - 24 : F, l = b[ie][M], F == R ? (a.min = a.max = l,
                        m = !1) : (a.min > l && (a.min = l), a.max < l && (a.max = l)), M % 3 == 0 ? C.push({
                            name: pd.toStringWithLeadingZeros(M, 2) + ":00",
                            dbt: p[ie][M],
                            rel: g[ie][M],
                            val: l
                        }) : C.push({
                            dbt: p[ie][M],
                            rel: g[ie][M],
                            val: l
                        });
                } else {
                    for (var V = 0, N = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], U = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], I = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], W = T; W <= D; ++W) if (ie = W >= A ? W - A : W,
                        O & x[k]) {
                        ++V;
                        for (F = R; F < P; ++F) M = F >= 24 ? F - 24 : F, B && !B(E[ie][M], L, H) || (I[M] += b[ie][M],
                            N[M] += p[ie][M], U[M] += g[ie][M]);
                    }
                    V = Math.max(1, V);
                    for (F = R; F < P; ++F) l = I[M = F >= 24 ? F - 24 : F] / V, F == R ? (a.min = a.max = l,
                        m = !1) : (a.min > l && (a.min = l), a.max < l && (a.max = l)), M % 3 == 0 ? C.push({
                            name: pd.toStringWithLeadingZeros(M, 2) + ":00",
                            dbt: N[M] / V,
                            rel: U[M] / V,
                            val: l
                        }) : C.push({
                            dbt: N[M] / V,
                            rel: U[M] / V,
                            val: l
                        });
                }
            } else if (3 == t.Chart.dataOverlay) {
                if (A >= 365) {
                    var G, _, $, K, Y, j, J, z = 0, q = pd.DateTime.getDayCountArray(o.year), X = 0, Z = 0, Q = 0,
                        ee = 0, te = 0, ae = 0, re = 0;
                    if (Math.abs(D - T) >= s.Chart.maxDayIndex()) {
                        for (var ie = 0; ie < A; ++ie) {
                            if (ie >= q[z + 1] && (m = !0, re > 0 && (X /= re, Z /= re, Q /= re, ee /= re, te /= re,
                                ae /= re, m ? (a.min = te, a.max = ae, m = !1) : (a.min > te && (a.min = te), a.max < ae && (a.max = ae)),
                                C.push({
                                    name: pd.DateTime.getMonthName(z),
                                    dbt: X,
                                    rel: ee,
                                    val: te
                                }), C.push({
                                    name: pd.DateTime.getMonthName(z),
                                    dbt: Z,
                                    rel: Q,
                                    val: ae
                                })), re = 0, ++z), O & x[k]) {
                                J = !0;
                                for (F = R; F < P; ++F) M = F >= 24 ? F - 24 : F, B && !B(E[ie][M], L, H) || (l = b[ie][M],
                                    d = p[ie][M], u = g[ie][M], J ? (G = _ = d, $ = K = u, Y = j = l, J = !1) : (G > d && (G = d),
                                        _ < d && (_ = d), $ > u && ($ = u), K < u && (K = u), Y > d && (Y = l), j < d && (j = l)));
                            }
                            X += G, Z += _, Q += $, ee += K, te += Y, ae += j, ++re, ++k > 6 && (k = 0);
                        }
                        re > 0 && (X /= re, Z /= re, Q /= re, ee /= re, te /= re, ae /= re, m ? (a.min = te,
                            a.max = ae, m = !1) : (a.min > te && (a.min = te), a.max < ae && (a.max = ae)),
                            C.push({
                                name: pd.DateTime.getMonthName(z),
                                dbt: X,
                                rel: ee,
                                val: te
                            }), C.push({
                                name: pd.DateTime.getMonthName(z),
                                dbt: Z,
                                rel: Q,
                                val: ae
                            }));
                    } else {
                        for (W = T; W <= D; ++W) {
                            if (ie = W >= A ? W - A : W, O & x[k]) {
                                J = !0;
                                for (F = R; F < P; ++F) M = F >= 24 ? F - 24 : F, B && !B(E[ie][M], L, H) || (l = b[ie][M],
                                    d = p[ie][M], u = g[ie][M], J ? (G = _ = d, $ = K = u, Y = j = l, J = !1) : (G > d && (G = d),
                                        _ < d && (_ = d), $ > u && ($ = u), K < u && (K = u), Y > l && (Y = l), j < l && (j = l)));
                            }
                            X += G, Z += _, Q += $, ee += K, te += Y, ae += j, ++re, ++k > 6 && (k = 0);
                        }
                        re > 0 && (X /= re, Z /= re, Q /= re, ee /= re, te /= re, ae /= re, m ? (a.min = te,
                            a.max = ae, m = !1) : (a.min > te && (a.min = te), a.max < ae && (a.max = ae)),
                            C.push({
                                name: "Min",
                                dbt: X,
                                rel: ee,
                                val: te
                            }), C.push({
                                name: "Max",
                                dbt: Z,
                                rel: Q,
                                val: ae
                            }));
                    }
                }
            } else if (s.Metric.calculateFrequency()) {
                a.min = 0, a.max = 1;
                for (W = T; W <= D; ++W) {
                    if (ie = W >= A ? W - A : W, O & x[k]) for (F = R; F < P; ++F) M = F >= 24 ? F - 24 : F,
                        B && !B(E[ie][M], L, H) || C.push({
                            dbt: p[ie][M],
                            rel: g[ie][M],
                            val: 0
                        });
                    ++k > 6 && (k = 0);
                }
            } else if (e.format == h && A >= 365) for (W = T; W <= D; ++W) {
                if (ie = W >= A ? W - A : W, O & x[k]) for (F = R; F < P; ++F) M = F >= 24 ? F - 24 : F,
                    B && !B(E[ie][M], L, H) || (l = b[ie][M], m ? (a.min = a.max = l, m = !1) : (a.min > l && (a.min = l),
                        a.max < l && (a.max = l)), C.push({
                            dbt: p[ie][M],
                            rel: g[ie][M],
                            val: l
                        }));
                ++k > 6 && (k = 0);
            } else if (e.format == c && b.length >= 8760) {
                var oe = 0;
                A = b.length > 8783 ? 366 : 365;
                for (W = T; W < D; ++W) {
                    if (ie = W >= A ? W - A : W, O & x[k]) for (F = R; F < P; ++F) M = F >= 24 ? F - 24 : F,
                        B && !B(E[oe + F], L, H) || (l = b[oe + F], m ? (a.min = a.max = l, m = !1) : (a.min > l && (a.min = l),
                            a.max < l && (a.max = l)), C.push({
                                dbt: p[ie][M],
                                rel: g[ie][M],
                                val: l
                            }));
                    oe += 24, ++k > 6 && (k = 0);
                }
            }
            if (r) {
                var ne, se = i.width() > 900 ? e.name : e.shortName;
                ne = s.Metric.calculateFrequency() ? se + " Points" : se + " (" + a.units + ")",
                    s.setValueWithoutUndo(s.Chart.dataOverlay, t.Chart.dataOverlay), i.setDataPoints(C, e),
                    i.set({
                        dataOverlay: t.Chart.dataOverlay,
                        subTitle: ne,
                        gridFadeCells: t.Chart.gridFadeCells,
                        dataDecimals: a.decimals,
                        dataMin: a.min,
                        dataMax: a.max,
                        units: a.units
                    });
            }
        }
        return a.value = Math.max(0, a.max - a.min), a;
    }

    function k(e) {
        var a = s.Metric.selection(), r = {
            units: "%",
            value: 0,
            decimals: 1,
            max: 100,
            min: 0
        };
        if (a && a.format) if (a.format == c || a.format == h) {
            if (t.Chart.dataOverlay <= 1) return R(a, r, e);
            if (t.Chart.dataOverlay > 1) return P(a, r, e);
        } else a.format == p || a.format;
        return r;
    }

    function O() {
        i && (k(!0), S || L || i.focus());
    }

    function A(e) {
        var a = e.keyCode || e.which;
        if (70 != a) {
            if (!e.ctrlKey && !e.altKey && !e.metaKey) {
                if (89 == a || 121 == a) return void (t.DateTimeRange.showSelector && s.Metric.year());
                if (77 == a || 109 == a) return void (t.DateTimeRange.showSelector && s.Metric.month(null, e));
                if (68 == a || 100 == a) return void (t.DateTimeRange.showSelector && s.Metric.day());
                if (80 == a || 112 == a) return void s.Chart.processPointSnapshot();
            }
        } else i && i.fit();
    }

    i.set("onTransitionMidway", function () {
        return 1 == t.Chart.dataOverlay && t.Chart.gridVerticalAxis < 0 && (O(), !0);
    }), ko.bindingHandlers.dateTimePicker = {
        init: function (e, t, a) {
            var r = a().dateTimePickerOptions || {};
            $(e).datetimepicker(r), ko.utils.registerEventHandler(e, "dp.change", function (e) {
                var a = t();
                ko.isObservable(a) && (null == e.date || e.date instanceof Date ? a(e.date) : a(e.date.toDate()));
            }), ko.utils.domNodeDisposal.addDisposeCallback(e, function () {
                var t = $(e).data("DateTimePicker");
                t && t.destroy();
            });
        },
        update: function (e, t) {
            var a = $(e).data("DateTimePicker");
            if (a) {
                var r = ko.utils.unwrapObservable(t());
                r = "object" != typeof r ? new Date(parseFloat(r.replace(/[^0-9]/g, ""))) : r, a.date(r);
            }
        }
    };
    var S = null, L = null;

    function H() {
        null != L && L.popoverX("hide");
    }

    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip(), $('[data-toggle="popover"]').popover(),
            $(".popover").on("shown.bs.modal", function () {
                pdSVG.ignoreSelection = !0, L = $(this);
            }).on("hidden.bs.modal", function () {
                pdSVG.ignoreSelection = !1, L = null, i.focus();
            }), $(".modal").on("shown.bs.modal", function () {
                pdSVG.ignoreSelection = !0, S = $(this);
            }).on("hidden.bs.modal", function () {
                pdSVG.ignoreSelection = !1, S = null, i.focus();
            }), $("[data-toggle='modal']").on("click", function () {
                H();
            }), $(document).on("mousedown touchstart pointerdown", function (e) {
                null != L && 0 === L.has(e.target).length && H();
            }), $("#layout-chart-panel").on("keydown", A).focus(), $("#popover-editnum").on("show.bs.modal", s.NumberEditor.handlePopoverShow).on("hide.bs.modal", s.NumberEditor.handlePopoverHide),
            $("#popover-editdim").on("show.bs.modal", s.DimensionEditor.handlePopoverShow).on("hide.bs.modal", s.DimensionEditor.handlePopoverHide),
            $("#popover-regions").on("show.bs.modal", function () {
                s.Chart.dataRegionsPopupIsOpen(!0), s.UndoManager.storeValues(s.Chart.dataRegionUndoChanges);
            }).on("hide.bs.modal", function () {
                s.Chart.dataRegionsPopupIsOpen(!1), s.UndoManager.checkForChanges();
            }), $("#popover-process").on("show.bs.modal", function () {
                s.Chart.processPointsStoreUndoData(), s.UndoManager.storeValues(s.Chart.processPointsUndoData);
            }).on("hide.bs.modal", function () {
                s.Chart.processPointsStoreUndoData(), s.UndoManager.checkForChanges();
            }), $("#popover-chart").on("show.bs.modal", function () {
                s.setValueWithoutUndo(s.Chart.title, i.title()), s.setValueWithoutUndo(s.Chart.subTitle, i.subTitle()),
                    s.UndoManager.storeValues(s.Chart.dryBulbMin, s.Chart.dryBulbMax, s.Chart.absHumidityMax, s.Chart.atmPressure, s.Chart.subTitle, s.Chart.title);
            }).on("hide.bs.modal", function () {
                s.UndoManager.checkForChanges();
            }), $("#popover-scale").on("show.bs.modal", function () {
                s.setValueWithoutUndo(s.Chart.units, i.units()), s.UndoManager.storeValues(s.Metric.scaleMin, s.Metric.scaleMax, s.Metric.metricPrefix, s.Chart.units);
            }).on("hide.bs.modal", function () {
                s.UndoManager.checkForChanges();
            }), $("#popover-padding").on("show.bs.modal", function () {
                s.UndoManager.storeValues(s.Chart.paddingTop, s.Chart.paddingRight, s.Chart.paddingBottom, s.Chart.paddingLeft);
            }).on("hide.bs.modal", function () {
                s.UndoManager.checkForChanges();
            }), $("#modal-metric").on("show.bs.modal", function () {
                s.Metric.updateDatePickerRange(), s.UndoManager.storeValues(s.Metric.selection, s.Metric.selectionIndex, s.Metric.operation, s.Metric.min, s.Metric.max, s.Metric.summation, s.Metric.thresholdLower, s.Metric.thresholdUpper, s.Metric.gridFadeCells, s.Metric.gridHighRes, s.Metric.dataOverlay, s.Metric.dateRangeStart, s.Metric.dateRangeEnd, s.Metric.fromTime, s.Metric.toTime, s.Metric.startDayOfWeek, s.Metric.dayFilter[0], s.Metric.dayFilter[1], s.Metric.dayFilter[2], s.Metric.dayFilter[3], s.Metric.dayFilter[4], s.Metric.dayFilter[5], s.Metric.dayFilter[6], s.Metric.filterOp, s.Metric.filterMetric, s.Metric.filterLower, s.Metric.filterUpper, s.Chart.gridVerticalAxis);
            }).on("hide.bs.modal", function () {
                s.UndoManager.checkForChanges();
            }), $("#modal-import").on("show.bs.modal", function () {
                s.Manager.importDialogOpen(!0);
            }).on("hide.bs.modal", function () {
                s.Manager.importDialogOpen(!1);
            }), $("#modal-export").on("show.bs.modal", function () {
                s.Manager.setExportText();
            }), $("#modal-data").on("show.bs.modal", function () {
                if (s.Manager.paramErrorVisible = !1, $("#file-drop-box-label").text("Drag and drop a JSON file anywhere in the app window to load it."),
                    $("#modal-data-alert").addClass("hidden"), a) s.Manager.formatParamData(); else {
                    var e = document.getElementById("jsoneditor");
                    e.addEventListener("load", r, !1), e.classList.add("loading"), e.src = "./jsonEditor.html";
                }
            }), $("#modal-save").on("show.bs.modal", s.SaveAs.handlePopoverShow).on("hide.bs.modal", s.SaveAs.handlePopoverHide),
            $("#modal-units").on("show.bs.modal", function () {
                s.DisplayUnits.syncWithChart();
            }), $("#modal-map").on("show.bs.modal", function () {
                s.Weather.geomapLoaded() || ($("#geomap").attr("src", "https://render.githubusercontent.com/view/geojson?url=https://raw.githubusercontent.com/NREL/EnergyPlus/develop/weather/master.geojson"),
                    s.Weather.geomapLoaded(!0));
            }).on("shown.bs.modal", function () {
                var e = Math.round(pd.constrainTo((pdDOM.getClientHeight() - 40) * pdDOM.pageScale, 250, 430));
                $("#geomap").height(e);
            }), pdDOM.enableDragDrop(document.body, s.Manager.importFile) && $("#file-drop-box").on("click", s.Manager.selectFile).show(),
            $("#container").fadeIn("slow"), setTimeout(function () {
                $("#loading-message").remove();
            }, 250), $(window).resize(function () {
                F(), L && (pdDOM.isAndroid || pdDOM.isWindows10 ? L.popoverX("show") : H());
            }), F(), s.UndoManager.add(s.Chart.showLinesUndo, s.Chart.lineHilite, s.Chart.infoOverlay, s.Chart.dataOverlay, s.Chart.processOverlay, s.Chart.verticalAxis, s.Chart.detailMode, s.Chart.showComfortGrid, s.Chart.showIndicator, s.Comfort.indicatorPosition, s.Comfort.clothingLevel, s.Comfort.metabolicRate, s.Comfort.externalWork, s.Comfort.meanRadiantTemperature, s.Comfort.airVelocity, s.Comfort.meanOutdoorTemperature, s.DateTime.datetime),
            s.DisplayUnits.temperature(t.DisplayUnits.temperature), s.DisplayUnits.humidity(t.DisplayUnits.humidity),
            s.DisplayUnits.pressure(t.DisplayUnits.pressure), s.DisplayUnits.volume(t.DisplayUnits.volume),
            s.DisplayUnits.enthalpy(t.DisplayUnits.enthalpy), s.DisplayUnits.velocity(t.DisplayUnits.velocity),
            s.UndoManager.reset(), pdDOM.getLocalStorageItem("showStartMenu") < .5 && $("#load-file").click();
    });
    var E = 1, B = -1;

    function F() {
        var e = pdDOM.getClientWidth(), a = pdDOM.getClientHeight();
        if (E = 1, a < 525 && (E = pd.mapAndConstrainTo(a, 300, 525, .57, 1)), e < 760 && (E = Math.min(E, pd.mapAndConstrainTo(e, 400, 760, .525, 1))),
            (E < .9999 || pdDOM.pageScale > 1.0001) && ($("html").css("zoom", E), pdDOM.pageScale = 1 / E,
                pdDOM.applyFirefoxPageScaleFix($("body"), e, a, E), a *= pdDOM.pageScale, e *= pdDOM.pageScale),
            t.DateTimeRange.showSelector) {
            var r = Math.min(120, .3 * (pdDOM.getClientHeight() - 45));
            if (r != B) {
                var o = document.getElementById("chart-range");
                (n = document.getElementById("chart-psychro")).style.height = "calc(100% - " + r + "px)",
                    o.style.height = r + "px", B = r;
            }
        } else {
            var n = document.getElementById("chart-psychro");
            B = pdDOM.getClientHeight() - 45, n.style.height = "100%";
        }
        i.rescale(), l.rescale();
    }

    ko.applyBindings(s);
}();