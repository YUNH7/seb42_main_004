package com.example.server.mealbox.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class MealboxPostDto {
    private String name;
    private int price;
    private int kcal;
    private int weight;
    private List<Product> products;
    @Getter
    public static class Product{
        private Long productId;
        private int quantity;
    }
}