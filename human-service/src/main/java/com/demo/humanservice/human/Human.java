package com.demo.humanservice.human;

import javax.persistence.*;

@Entity
@Table
public class Human {
    @Id
    @SequenceGenerator(
            name = "human_sequence",
            sequenceName = "human_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "human_sequence"
    )

    private long id;
    private String first_name;
    private String last_name;

    public Human() {
    }

    public Human(String first_name, String last_name) {
        this.first_name = first_name;
        this.last_name = last_name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }
}
