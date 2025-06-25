document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('churn-form');
    const resultadoDiv = document.getElementById('resultado');
    const loader = document.getElementById('loader');
    let model;

    // Este orden DEBE COINCIDIR con el que se entrenó el modelo.
    // Lista obtenida del archivo 'column_names.json' generado en Colab.
    const MODEL_COLUMNS = [
        'Age', 'DailyRate', 'DistanceFromHome', 'Education', 'EmployeeCount', 'EmployeeNumber',
        'EnvironmentSatisfaction', 'HourlyRate', 'JobInvolvement', 'JobLevel', 'JobSatisfaction',
        'MonthlyIncome', 'MonthlyRate', 'NumCompaniesWorked', 'PercentSalaryHike', 'PerformanceRating',
        'RelationshipSatisfaction', 'StandardHours', 'StockOptionLevel', 'TotalWorkingYears',
        'TrainingTimesLastYear', 'WorkLifeBalance', 'YearsAtCompany', 'YearsInCurrentRole',
        'YearsSinceLastPromotion', 'YearsWithCurrManager',
        'BusinessTravel_Travel_Frequently', 'BusinessTravel_Travel_Rarely',
        'Department_Research & Development', 'Department_Sales',
        'EducationField_Life Sciences', 'EducationField_Marketing', 'EducationField_Medical',
        'EducationField_Other', 'EducationField_Technical Degree',
        'Gender_Male',
        'JobRole_Human Resources', 'JobRole_Laboratory Technician', 'JobRole_Manager',
        'JobRole_Manufacturing Director', 'JobRole_Research Director', 'JobRole_Research Scientist',
        'JobRole_Sales Executive', 'JobRole_Sales Representative',
        'MaritalStatus_Married', 'MaritalStatus_Single',
        'OverTime_Yes'
    ];

    // Cargar el modelo de TensorFlow.js
    async function loadModel() {
        console.log("Cargando modelo...");
        try {
            model = await tf.loadLayersModel('./modelo_attrition_web/model.json');
            console.log("Modelo cargado exitosamente.");
        } catch (error) {
            console.error("Error al cargar el modelo:", error);
            resultadoDiv.innerText = "Error: No se pudo cargar el modelo de predicción.";
            resultadoDiv.className = 'riesgo-alto';
            resultadoDiv.style.display = 'block';
        }
    }

    loadModel();

    // Gestiona el envío del formulario
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!model) {
            alert("El modelo aún no está cargado. Por favor, espere.");
            return;
        }

        loader.style.display = 'block';
        resultadoDiv.style.display = 'none';

        try {
            const inputData = collectAndPreprocessData();
            const prediction = await predict(inputData);
            displayResult(prediction);
        } catch (error) {
            console.error("Error durante la predicción:", error);
            resultadoDiv.innerText = "Ocurrió un error al procesar la solicitud.";
            resultadoDiv.className = 'riesgo-alto';
        } finally {
            loader.style.display = 'none';
            resultadoDiv.style.display = 'block';
        }
    });

    // Recolecta y preprocesa los datos del formulario para el modelo
    function collectAndPreprocessData() {
        const formData = {
            'Age': parseInt(document.getElementById('age').value),
            'MonthlyIncome': parseInt(document.getElementById('monthly-income').value),
            'TotalWorkingYears': parseInt(document.getElementById('total-working-years').value),
            'YearsAtCompany': parseInt(document.getElementById('years-at-company').value),
            'JobRole': document.getElementById('job-role').value,
            'OverTime': document.getElementById('overtime').value,
            'BusinessTravel': document.getElementById('business-travel').value
        };

        const featureVector = new Array(MODEL_COLUMNS.length).fill(0);

        MODEL_COLUMNS.forEach((colName, index) => {
            if (colName === 'Age') featureVector[index] = formData.Age;
            if (colName === 'MonthlyIncome') featureVector[index] = formData.MonthlyIncome;
            if (colName === 'TotalWorkingYears') featureVector[index] = formData.TotalWorkingYears;
            if (colName === 'YearsAtCompany') featureVector[index] = formData.YearsAtCompany;
            if (colName === `JobRole_${formData.JobRole.replace(/ /g, '_')}`) featureVector[index] = 1;
            if (colName === `OverTime_${formData.OverTime}`) featureVector[index] = 1;
            if (colName === `BusinessTravel_${formData.BusinessTravel}`) featureVector[index] = 1;
        });

        console.log("Vector de características para predicción:", featureVector);
        return featureVector;
    }
    
    // Realiza la predicción con el modelo
    async function predict(inputData) {
        // Crea un tensor 2D [1, num_features] a partir de los datos
        const inputTensor = tf.tensor2d([inputData]);
        
        const predictionTensor = model.predict(inputTensor);
        const prediction = (await predictionTensor.data())[0];
        
        // Libera memoria
        inputTensor.dispose();
        predictionTensor.dispose();

        console.log("Probabilidad de rotación (0 a 1):", prediction);
        return prediction;
    }

    // Muestra el resultado de la predicción en la interfaz
    function displayResult(prediction) {
        const probability = prediction * 100;
        const threshold = 50; // Umbral para clasificar el riesgo

        if (probability >= threshold) {
            resultadoDiv.innerHTML = `<strong>Riesgo Alto de Rotación</strong><br>Probabilidad: ${probability.toFixed(2)}%`;
            resultadoDiv.className = 'riesgo-alto';
        } else {
            resultadoDiv.innerHTML = `<strong>Probabilidad Baja de Salida</strong><br>Probabilidad: ${probability.toFixed(2)}%`;
            resultadoDiv.className = 'riesgo-bajo';
        }
    }
});