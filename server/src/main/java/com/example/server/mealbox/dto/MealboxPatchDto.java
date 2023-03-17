package com.example.server.mealbox.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class MealboxPatchDto {
    private String name;
    private int price;
    private int kcal;
    private int weight;
    private List<MealboxPatchDto.Product> products;
    @Getter
    public static class Product{
        private Long productId;
        private int quantity;
    }
}