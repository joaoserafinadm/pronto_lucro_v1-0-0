export default function handleResults(
    type,
    status,
    view,
    dfcData,
    incomeCategoriesFilter = [],
    expenseCategoriesFilter = [],
    accountsFilter = [],
    bankAccounts = [],
    incomeCategories = [],
    expenseCategories = []
) {
    const statusFilter = status === "Efetuadas" ? true : status === "Pendentes" ? false : null;
    const categories = type === "income" ? incomeCategories : expenseCategories;
    const categoryFilters = type === "income" ? incomeCategoriesFilter : expenseCategoriesFilter;

    const hasCategoryFilters = categoryFilters.length > 0;
    const hasAccountFilters = accountsFilter.length > 0;

    // Filtragem inicial
    const filteredCategories = hasCategoryFilters
        ? categories.filter(cat => categoryFilters.some(filter => filter._id === cat._id))
        : categories;

    const filteredData = dfcData.filter(item => {
        const isStatusMatch = statusFilter === null || item.active === statusFilter;
        const isTypeMatch = item.type === type;
        const isCategoryMatch = filteredCategories.some(cat =>
            cat.subCategories.some(subCat => subCat._id === item.subCategory_id)
        );
        const isAccountMatch = hasAccountFilters
            ? accountsFilter.some(filter => filter._id === item.account_id)
            : true;

        return isStatusMatch && isTypeMatch  && isAccountMatch;
        // return isStatusMatch && isTypeMatch && isCategoryMatch && isAccountMatch;
    });

    if (view === "Categorias") {
        const groupedData = filteredData.reduce((acc, item) => {
            const category = filteredCategories.find(cat =>
                cat.subCategories.some(subCat => subCat._id === item.subCategory_id)
            );

            if (category) {
                if (!acc[category.categoryName]) {
                    acc[category.categoryName] = {
                        name: category.categoryName,
                        value: 0,
                        color: category.color,
                        subCategories: {},
                    };
                }
                acc[category.categoryName].value += item.value;

                const subCategory = category.subCategories.find(subCat => subCat._id === item.subCategory_id);
                if (subCategory) {
                    if (!acc[category.categoryName].subCategories[subCategory.name]) {
                        acc[category.categoryName].subCategories[subCategory.name] = {
                            name: subCategory.name,
                            value: 0,
                        };
                    }
                    acc[category.categoryName].subCategories[subCategory.name].value += item.value;
                }
            } else {
                if (!acc["Sem categoria"]) {
                    acc["Sem categoria"] = {
                        name: "Sem categoria",
                        value: 0,
                        color: "#CCCCCC",
                        subCategories: {},
                    };
                }
                acc["Sem categoria"].value += item.value;
            }
            return acc;
        }, {});

        const totalValue = Object.values(groupedData).reduce((sum, category) => sum + category.value, 0);

        return Object.entries(groupedData).map(([categoryName, categoryData]) => {
            const categoryPercentage = ((categoryData.value / totalValue) * 100).toFixed(2);
            const subCategoryData = Object.entries(categoryData.subCategories).map(([subCategoryName, subCategory]) => ({
                name: subCategory.name,
                value: subCategory.value,
                percentage: ((subCategory.value / totalValue) * 100).toFixed(2),
            }));
            return {
                name: categoryData.name,
                value: categoryData.value,
                percentage: categoryPercentage,
                color: categoryData.color,
                subCategories: subCategoryData,
            };
        });
    } else if (view === "Contas") {
        const groupedData = filteredData.reduce((acc, item) => {
            const bankAccount = bankAccounts.find(account => account._id === item.account_id);

            if (bankAccount) {
                if (!acc[bankAccount.description]) {
                    acc[bankAccount.description] = {
                        name: bankAccount.description,
                        value: 0,
                        color: bankAccount.color,
                    };
                }
                acc[bankAccount.description].value += item.value;
            } else {
                if (!acc["Sem conta"]) {
                    acc["Sem conta"] = {
                        name: "Sem conta",
                        value: 0,
                        color: "#CCCCCC",
                    };
                }
                acc["Sem conta"].value += item.value;
            }
            return acc;
        }, {});

        const totalValue = Object.values(groupedData).reduce((sum, account) => sum + account.value, 0);

        return Object.entries(groupedData).map(([accountName, accountData]) => {
            const accountPercentage = ((accountData.value / totalValue) * 100).toFixed(2);
            return {
                name: accountData.name,
                value: accountData.value,
                percentage: accountPercentage,
                color: accountData.color,
            };
        });
    }

    return [];
}
