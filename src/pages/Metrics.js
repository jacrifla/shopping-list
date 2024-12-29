import React, { useEffect, useState } from 'react';
import { initialItems, transactions, calculateTotalSpent } from '../data';
import Header from '../components/Header';
import { Card, Row, Col, ListGroup } from 'react-bootstrap';

const Metrics = () => {
    const [totalMonthly, setTotalMonthly] = useState(0);
    const [totalWeekly, setTotalWeekly] = useState(0);
    const [mostPurchasedItem, setMostPurchasedItem] = useState({});
    const [itemQuantities, setItemQuantities] = useState({});
    const [averagePricePerItem, setAveragePricePerItem] = useState(0);
    const [averageTransactionCost, setAverageTransactionCost] = useState(0);
    const [mostExpensiveItem, setMostExpensiveItem] = useState({});

    useEffect(() => {
        const currentDate = new Date();

        // Calcular o total dos últimos 30 dias
        const monthStart = new Date(currentDate);
        monthStart.setDate(currentDate.getDate() - 30); // Subtrai 30 dias de hoje para pegar o início dos últimos 30 dias
        const monthEnd = currentDate; // A data de hoje é o fim do período

        const monthlyTotal = calculateTotalSpent(transactions, monthStart, monthEnd);
        setTotalMonthly(monthlyTotal);

        // Calcular total semanal (últimos 7 dias)
        const weekStart = new Date();
        weekStart.setDate(currentDate.getDate() - 7);
        const weeklyTotal = calculateTotalSpent(transactions, weekStart, currentDate);
        setTotalWeekly(weeklyTotal);

        // Calcular o item mais comprado
        const itemCounts = transactions.reduce((counts, transaction) => {
            counts[transaction.itemId] = (counts[transaction.itemId] || 0) + transaction.quantity;
            return counts;
        }, {});
        const mostPurchasedItemId = Object.keys(itemCounts).reduce((a, b) => itemCounts[a] > itemCounts[b] ? a : b);
        setMostPurchasedItem(initialItems.find(item => item.id === parseInt(mostPurchasedItemId)));

        // Quantidade de cada item
        const quantities = initialItems.reduce((acc, item) => {
            const itemTransactions = transactions.filter(transaction => transaction.itemId === item.id);
            const totalQuantity = itemTransactions.reduce((sum, transaction) => sum + transaction.quantity, 0);
            acc[item.name] = totalQuantity;
            return acc;
        }, {});
        setItemQuantities(quantities);

        // Cálculo do preço médio por item
        const totalSpent = transactions.reduce((sum, transaction) => sum + transaction.price * transaction.quantity, 0);
        const totalItems = transactions.reduce((sum, transaction) => sum + transaction.quantity, 0);
        setAveragePricePerItem(totalSpent / totalItems);

        // Cálculo do gasto médio por transação
        const totalTransactions = transactions.length;
        setAverageTransactionCost(totalSpent / totalTransactions);

        // Calcular o item mais caro
        const maxPriceTransaction = transactions.reduce((max, transaction) => {
            if (transaction.price > max.price) {
                return transaction;
            }
            return max;
        }, { price: 0 });
        const expensiveItem = initialItems.find(item => item.id === maxPriceTransaction.itemId);
        setMostExpensiveItem(expensiveItem);
    }, []);

    const getMinMaxPriceForItem = (itemId) => {
        // Filtra as transações do item específico
        const itemTransactions = transactions.filter((transaction) => transaction.itemId === itemId);

        if (itemTransactions.length > 0) {
            // Extrai os preços de todas as transações do item
            const prices = itemTransactions.map((transaction) => transaction.price);

            // Calcula o menor e o maior preço
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);

            // Retorna o menor e o maior preço
            return { minPrice, maxPrice };
        }

        // Se não houver transações, retorna 'N/A'
        return { minPrice: 'N/A', maxPrice: 'N/A' };
    };

    return (
        <div>
            <Header />
            <div className="container py-4">
                <h2 className="mb-4 text-center text-primary">Métricas de Compra</h2>

                {/* Gasto no Mês e Semana lado a lado */}
                <Row className="mb-4">
                    <Col md={6} sm={12} className="mb-3">
                        <Card className="shadow-sm border-0">
                            <Card.Body>
                                <Card.Title className="d-flex align-items-center">
                                    <i className="bi bi-wallet2 me-2 text-success" />
                                    <span>Total Gasto no Mês</span>
                                </Card.Title>
                                <Card.Text className="fs-4 text-primary">
                                    R${totalMonthly.toFixed(2)}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} sm={12} className="mb-3">
                        <Card className="shadow-sm border-0">
                            <Card.Body>
                                <Card.Title className="d-flex align-items-center">
                                    <i className="bi bi-calendar-week me-2 text-info" />
                                    <span>Total Gasto na Semana</span>
                                </Card.Title>
                                <Card.Text className="fs-4 text-primary">
                                    R${totalWeekly.toFixed(2)}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Preço Médio por Item e Gasto Médio por Transação lado a lado */}
                <Row className="mb-4">
                    <Col md={6} sm={12} className="mb-3">
                        <Card className="shadow-sm border-0">
                            <Card.Body>
                                <Card.Title className="d-flex align-items-center">
                                    <i className="bi bi-currency-dollar me-2 text-warning" />
                                    <span>Preço Médio por Item</span>
                                </Card.Title>
                                <Card.Text className="fs-4 text-primary">
                                    R${averagePricePerItem.toFixed(2)}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} sm={12} className="mb-3">
                        <Card className="shadow-sm border-0">
                            <Card.Body>
                                <Card.Title className="d-flex align-items-center">
                                    <i className="bi bi-credit-card me-2 text-info" />
                                    <span>Gasto Médio por Transação</span>
                                </Card.Title>
                                <Card.Text className="fs-4 text-primary">
                                    R${averageTransactionCost.toFixed(2)}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Comparação de Preços */}
                <Row className="mb-4">
                    <Col md={12}>
                        <Card className="shadow-sm border-0">
                            <Card.Body>
                                <Card.Title className="d-flex align-items-center">
                                    <i className="bi bi-tags me-2 text-info" />
                                    <span>Comparação de Preços</span>
                                </Card.Title>
                                <ListGroup variant="flush">
                                    {initialItems.map(item => {
                                        const { minPrice, maxPrice } = getMinMaxPriceForItem(item.id);

                                        return (
                                            <ListGroup.Item key={item.id}>
                                                <strong>{item.name}:</strong>
                                                {minPrice !== 'N/A' && maxPrice !== 'N/A' ? (
                                                    <>
                                                        <div className={`text-success ${minPrice === maxPrice ? 'fw-bold' : ''}`}>
                                                            Menor Preço: R${minPrice.toFixed(2)}
                                                        </div>
                                                        <div className={`text-danger ${minPrice === maxPrice ? 'fw-bold' : ''}`}>
                                                            Maior Preço: R${maxPrice.toFixed(2)}
                                                        </div>
                                                    </>
                                                ) : (
                                                    'Preço não disponível'
                                                )}
                                            </ListGroup.Item>
                                        );
                                    })}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Item Mais Comprado e Item Mais Caro lado a lado */}
                <Row className="mb-4">
                    <Col md={6} sm={12} className="mb-3">
                        <Card className="shadow-sm border-0">
                            <Card.Body>
                                <Card.Title className="d-flex align-items-center">
                                    <i className="bi bi-cart-fill me-2 text-warning" />
                                    <span>Item Mais Comprado</span>
                                </Card.Title>
                                {mostPurchasedItem && (
                                    <div>
                                        <h5>{mostPurchasedItem.name}</h5>
                                        <p>Quantidade: {itemQuantities[mostPurchasedItem.name]}</p>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} sm={12} className="mb-3">
                        <Card className="shadow-sm border-0">
                            <Card.Body>
                                <Card.Title className="d-flex align-items-center">
                                    <i className="bi bi-gem me-2 text-danger" />
                                    <span>Item Mais Caro</span>
                                </Card.Title>
                                {mostExpensiveItem && (
                                    <div>
                                        <h5>{mostExpensiveItem.name}</h5>
                                        <p>Preço: R${mostExpensiveItem.price}</p>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Quantidade de Cada Item */}
                <Row className="mb-4">
                    <Col md={12}>
                        <Card className="shadow-sm border-0">
                            <Card.Body>
                                <Card.Title className="d-flex align-items-center">
                                    <i className="bi bi-boxes me-2 text-danger" />
                                    <span>Quantidade de Cada Item</span>
                                </Card.Title>
                                <ListGroup variant="flush">
                                    {Object.entries(itemQuantities).map(([itemName, quantity]) => (
                                        <ListGroup.Item key={itemName}>
                                            <strong>{itemName}:</strong> {quantity}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Metrics;
