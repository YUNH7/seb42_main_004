package com.example.server.product.service;

import com.example.server.exception.BusinessLogicException;
import com.example.server.exception.ExceptionCode;
import com.example.server.product.entity.Product;
import com.example.server.product.exception.ProductException;
import com.example.server.product.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Transactional
@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long productId, Product productPatcher){
        Product product = findProductById(productId);
        if(productPatcher.getName()!=null)
            product.setName(productPatcher.getName());
        if(productPatcher.getUnitKcal()!=0)
            product.setUnitKcal(productPatcher.getUnitKcal());
        if(productPatcher.getUnitWeight()!=0)
            product.setUnitWeight(productPatcher.getUnitWeight());
        if(productPatcher.getUnitPrice()!=0)
            product.setUnitPrice(productPatcher.getUnitPrice());
        return productRepository.save(product);
    }//이것들 다 유효성검증 + 리팩토링필요 (null아니면 해당값 고치기 메서드정의하기)

    public void deleteProduct(Long productId){
        Product product = findProductById(productId);
        productRepository.delete(product);
    }

    public Product findProductById(Long productId){
        Optional<Product> findProduct = productRepository.findById(productId);
        return findProduct.orElseThrow(()->new BusinessLogicException(ProductException.PRODUCT_NOT_FOUND));
    }

    public Page<Product> findProducts(int page, int size, String sort, Sort.Direction direction){
        PageRequest pageRequest = null;
        if(direction.isAscending()){
            pageRequest =
                    PageRequest.of(page-1, size, Sort.by(sort).ascending());
        } else if(direction.isDescending()){
            pageRequest =
                    PageRequest.of(page-1, size, Sort.by(sort).descending());
        }
        return productRepository.findAll(pageRequest);
    }

    public Page<Product> searchProducts(String search, int page, int size, String sort, Sort.Direction direction){
        PageRequest pageRequest = null;
        if(direction.isAscending()){
            pageRequest =
                    PageRequest.of(page-1, size, Sort.by(sort).ascending());
        } else if(direction.isDescending()){
            pageRequest =
                    PageRequest.of(page-1, size, Sort.by(sort).descending());
        }
        return productRepository.findAllByNameContains(search, pageRequest);
    }
}
