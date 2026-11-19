package com.spring.spring_mvc.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.spring_mvc.entity.Auth_Role;

/**
 * AuthRoleRepository
 * <p>
 * JPA entity representing an authorization role or authority in the system.
 * Maps to the {@code auth_role} database table.
 * <p>
 *  
 * @author Felisa Bascug
 */
public interface AuthRoleRepository extends JpaRepository<Auth_Role, Long> {

    Optional<Auth_Role> findByName(String name);
    Boolean existsByName(String name);

}
