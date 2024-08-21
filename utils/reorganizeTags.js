
export default function reorganizeTags(tags) {
    return tags.reduce((acc, tag) => {
        const { category } = tag;

        // Encontra o índice da categoria no array acumulador
        const categoryIndex = acc.findIndex(item => item.category === category);

        // Se a categoria já existe no acumulador, adiciona a tag a essa categoria
        if (categoryIndex > -1) {
            acc[categoryIndex].tags.push(tag);
        } else {
            // Se a categoria não existe, cria um novo objeto de categoria
            acc.push({
                id: `${Date.now()}-${Math.random()}+${Math.random()}`,
                category,
                tags: [tag]
            });
        }

        return acc;
    }, []);
};