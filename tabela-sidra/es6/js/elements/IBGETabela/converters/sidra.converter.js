function convert(rawData) {
    let _localidades = {}, periodos = [], _categorias = {}, valores = {};
    for (const response of rawData) {
        for (const { classificacoes, series } of response.resultados) {
            let obj = classificacoes[0].categoria;
            const categoria = Object.keys(obj).map(key => ({ id: key, nome: obj[key] }))[0];
            for (const { localidade, serie } of series) {
                _localidades[localidade.id] = localidade;
                let { periodo, valor } = serie;
                periodos.push(periodo);
            }
        }
    }
    return {
        localidades: Object.keys(_localidades).map(key => _localidades[key]),
        periodos,
        categorias: Object.keys(_categorias).map(key => _categorias[key]),
        valores
    };
}
//# sourceMappingURL=sidra.converter.js.map